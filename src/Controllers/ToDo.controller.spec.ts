// this is end to end testing
import { Test, TestingModule } from '@nestjs/testing';
import * as moment from 'moment';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { ITestDbService, TestDbService } from '../../../test/db-config';

import { ToDoController } from './ToDo.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ToDoService } from '../Services/ToDo.service';
import { ToDoClient } from '../Clients/ToDo.client';
import { CreateToDoBodyDto, UpdateToDoPayloadDto } from '../Models/ToDo.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { Priority, ToDo } from '@prisma/client';

jest.useFakeTimers();

describe('ToDo Controller', () => {
  let controller: ToDoController;
  let toDoService: ToDoService;
  let app: INestApplication;

  beforeEach(async (done) => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [
        ToDoService,
        ToDoClient,
        PrismaService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            userId: 'user3',
          };

          return true;
        },
      })
      .compile();

    controller = module.get<ToDoController>(ToDoController);
    toDoService = module.get<ToDoService>(ToDoService);

    app = module.createNestApplication();
    app.init();
  });

  const dateToday = moment.utc(new Date().toUTCString());
  const testTodo: ToDo = {
    id: '604ea235-7471-4c16-b508-3243880457a8',
    title: 'task1',
    description:
      "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    priority: 'A',
    completed: false,
    date: dateToday.toDate(),
    createdBy: 'user3',
  };

  jest
    .spyOn(toDoService, 'getToDosByUserId')
    .mockImplementation(async (userId: string): Promise<ToDo[]> => {
      return [testTodo];
    });

  jest
    .spyOn(toDoService, 'createToDo')
    .mockImplementation(
      async (
        title: string,
        description: string,
        priority: Priority,
        completed: boolean,
        date: Date,
        createdBy: string,
      ): Promise<ToDo> => {
        return testTodo;
      },
    );

  jest
    .spyOn(toDoService, 'updateToDo')
    .mockImplementation(
      async (
        id: string,
        title: string,
        description: string,
        priority: Priority,
        completed: boolean,
        date: Date,
        createdBy: string,
      ): Promise<ToDo> => {
        return testTodo;
      },
    );

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to return toDos', async (done) => {
    jest.setTimeout(100000);
    request(app.getHttpServer())
      .get('/toDo')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should be able to delete toDo', async (done) => {
    request(app.getHttpServer())
      .delete('/toDo/3')
      .end(async (error, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });

  const testToDoCreate: CreateToDoBodyDto = {
    title: 'task1',
    description:
      "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    priority: 'A',
    completed: false,
    date: dateToday.toDate(),
  };

  it('should be able to create ToDo', async (done) => {
    request(app.getHttpServer())
      .post('/toDo')
      .send(testToDoCreate)
      .set('Content-Type', 'application/json')
      .end(async (error, res) => {
        expect(res.status).toEqual(201);
        done();
      });
  });

  const dateTomorrow = moment.utc(new Date().toUTCString()).add(1, 'day');
  const testToDoUpdate: UpdateToDoPayloadDto = {
    id: '604ea235-7471-4c16-b508-3243880457a8',
    title: 'task1',
    description:
      "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    priority: 'A',
    completed: true,
    date: dateTomorrow.toDate(),
  };

  it('should be able to update toDo', async (done) => {
    request(app.getHttpServer())
      .put('/toDo')
      .send(testToDoUpdate)
      .set('Content-Type', 'application/json')
      .end(async (error, res) => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});
