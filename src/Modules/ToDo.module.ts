import { Module } from '@nestjs/common';

import { ToDoController } from '../Controllers/ToDo.controller';
import { ToDoService } from '../Services/ToDo.service';
import { ToDoClient } from '../Clients/ToDo.client';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService, ToDoClient],
})
export class ToDoModule {}
