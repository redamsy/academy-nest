import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsDate,
  IsEnum,
} from 'class-validator';
// https://docs.nestjs.com/techniques/validation
import { Type } from 'class-transformer';
// import { Priority } from '@prisma/client';

// interface ICreateToDoBody {
//   title: string;
//   description: string;
//   priority: Priority;
//   completed: boolean;
//   date: Date;
// }

// export class CreateToDoBodyDto implements ICreateToDoBody {
//   @IsDefined()
//   @IsNotEmpty()
//   @IsString()
//   title: string;

//   @IsDefined()
//   @IsNotEmpty()
//   @IsString()
//   description: string;

//   @IsDefined()
//   @IsEnum(Priority)
//   @IsNotEmpty()
//   public priority: Priority;

//   @IsDefined()
//   @IsBoolean()
//   completed: boolean;

//   @IsDefined()
//   @Type(() => Date)
//   @IsDate()
//   @IsNotEmpty()
//   public date: Date;

//   constructor(
//     title: string,
//     description: string,
//     priority: Priority,
//     completed: boolean,
//     date: Date,
//   ) {
//     this.title = title;
//     this.description = description;
//     this.priority = priority;
//     this.completed = completed;
//     this.date = date;
//   }
// }

// export class UpdateToDoPayloadDto extends CreateToDoBodyDto {
//   @IsDefined()
//   @IsString()
//   @IsNotEmpty()
//   public id: string;

//   constructor(
//     id: string,
//     title: string,
//     description: string,
//     priority: Priority,
//     completed: boolean,
//     date: Date,
//   ) {
//     super(title, description, priority, completed, date);
//     this.id = id;
//   }
// }
