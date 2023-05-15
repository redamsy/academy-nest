import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { ToDo } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { CreateToDoBodyDto, UpdateToDoPayloadDto } from '../Models/ToDo.model';
import { CurrentUser } from '../Decorators/CurrentUser.decorator';

import { ToDoService } from '../Services/ToDo.service';

@Controller('todo')
export class ToDoController {
  constructor(private toDoService: ToDoService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // public async getCurrentUserToDos(
  //   @CurrentUser() { userId }: any, //or @CurrentUser('userId') userId: string
  // ): Promise<ToDo[]> {
  //   return this.toDoService.getToDosByUserId(userId);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // public async createToDo(
  //   @CurrentUser() { userId }: any, //or @CurrentUser('userId') userId: string
  //   @Body()
  //   { title, description, priority, completed, date }: CreateToDoBodyDto,
  // ): Promise<ToDo> {
  //   return this.toDoService.createToDo(
  //     title,
  //     description,
  //     priority,
  //     completed,
  //     date,
  //     userId,
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('/:toDoId')
  // updateToDo(
  //   @CurrentUser() { userId }: any,
  //   @Body()
  //   { id, title, description, priority, completed, date }: UpdateToDoPayloadDto,
  // ): Promise<ToDo> {
  //   return this.toDoService.updateToDo(
  //     id,
  //     title,
  //     description,
  //     priority,
  //     completed,
  //     date,
  //     userId,
  //   );
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/:toDoId')
  // async deleteToDoById(
  //   @CurrentUser() { userId }: any,
  //   @Param('toDoId') toDoId,
  // ): Promise<any> {
  //   return this.toDoService.removeToDo(toDoId, userId);
  // }
}
