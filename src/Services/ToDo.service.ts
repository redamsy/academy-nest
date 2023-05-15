import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
// import { Priority, ToDo } from '@prisma/client';

import { ToDoClient } from '../Clients/ToDo.client';
@Injectable()
export class ToDoService {
  /**
   *
   */
  constructor(private readonly toDoClient: ToDoClient) {}

  // public async getToDosByUserId(userId: string): Promise<ToDo[]> {
  //   return this.toDoClient.getToDosByUserId(userId);
  // }

  // public async createToDo(
  //   title: string,
  //   description: string,
  //   priority: Priority,
  //   completed: boolean,
  //   date: Date,
  //   createdBy: string,
  // ): Promise<ToDo> {
  //   return this.toDoClient.createToDo(
  //     title,
  //     description,
  //     priority,
  //     completed,
  //     date,
  //     createdBy,
  //   );
  // }

  // public async updateToDo(
  //   id: string,
  //   title: string,
  //   description: string,
  //   priority: Priority,
  //   completed: boolean,
  //   date: Date,
  //   createdBy: string,
  // ): Promise<ToDo> {
  //   try {
  //     const toDo = await this.toDoClient.getToDoByUserAndToDoId(id, createdBy);
  //     if (!toDo) {
  //       throw new ForbiddenException(
  //         'Failed to update ToDo, user does not own this resource',
  //       );
  //     }
  //     const result = await this.toDoClient.updateToDo(
  //       id,
  //       title,
  //       description,
  //       priority,
  //       completed,
  //       date,
  //     );
  //     if (!result) {
  //       throw new NotFoundException('Failed to update ToDo');
  //     }
  //     return result;
  //   } catch (e) {
  //     throw new NotFoundException(
  //       `Failed to update ToDo with error code ${e.code}`,
  //     );
  //   }
  // }

  // public async removeToDo(id: string, createdBy: string): Promise<any> {
  //   try {
  //     const toDo = await this.toDoClient.getToDoByUserAndToDoId(id, createdBy);
  //     if (!toDo) {
  //       throw new ForbiddenException(
  //         'Failed to delete ToDo, user does not own this resource',
  //       );
  //     }
  //     const result = await this.toDoClient.removeToDo(id);
  //     if (!result) {
  //       throw new NotFoundException('Failed to delete ToDo');
  //     }
  //     return result;
  //   } catch (e) {
  //     throw new NotFoundException(
  //       `Failed to delete ToDo with error code ${e.code}`,
  //     );
  //   }
  // }
}
