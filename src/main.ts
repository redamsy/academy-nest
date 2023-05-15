import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/security/cors
  app.enableCors();
  // helmet: https://docs.nestjs.com/security/helmet#use-with-express-default
  app.use(helmet());
  app.use(morgan('tiny'));

  // Building a REST API with NestJS and Prisma:
  // https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0
  const config = new DocumentBuilder()
    .setTitle('Academy-nest')
    .setDescription('The Academy nestjs API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
