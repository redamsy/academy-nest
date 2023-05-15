import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });

    /* LOGGING MIDDLEWARE */
    this.$use(async (params, next) => {
      const before = Date.now();

      const result = await next(params);

      const after = Date.now();

      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      );

      return result;
    });

    /***********************************/
    /* SOFT DELETE MIDDLEWARE */

    this.$use(async (params, next) => {
      // Check incoming query type
      if (params.model === 'Course') {
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update';
          params.args['data'] = { deleted: true };
        }
        if (params.action == 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany';
          if (params.args.data != undefined) {
            params.args.data['deleted'] = true;
          } else {
            params.args['data'] = { deleted: true };
          }
        }
      }
      return next(params);
    });
    /***********************************/
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
