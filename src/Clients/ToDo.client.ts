import { v4 as uuidV4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { ToDo, Prisma, Priority } from '@prisma/client';

@Injectable()
export class ToDoClient {
  constructor(private prisma: PrismaService) {}

  public async getToDoByUserAndToDoId(
    toDoId: string,
    userId: string,
  ): Promise<ToDo | null> {
    return this.prisma.toDo.findFirst({
      where: { id: toDoId, createdBy: userId },
    });
  }

  public async getToDosByUserId(userId: string): Promise<ToDo[]> {
    return this.prisma.toDo.findMany({
      where: { createdBy: userId },
    });
  }

  public async createToDo(
    title: string,
    description: string,
    priority: Priority,
    completed: boolean,
    date: Date,
    createdBy: string,
  ): Promise<ToDo> {
    const id = uuidV4();

    return this.prisma.toDo.create({
      data: {
        id,
        title,
        description,
        priority,
        completed,
        date,
        createdBy,
      },
    });
  }

  public async updateToDo(
    id: string,
    title: string,
    description: string,
    priority: Priority,
    completed: boolean,
    date: Date,
  ): Promise<ToDo> {
    return this.prisma.toDo.update({
      data: {
        title,
        description,
        priority,
        completed,
        date,
      },
      where: { id },
    });
  }

  public async removeToDo(id: string) {
    return this.prisma.toDo.delete({
      where: { id },
    });
  }
}
