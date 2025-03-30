import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'
import { Priority, Status } from 'src/enum/task.enum'
import { User } from 'src/user/entities/user.entity'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(Status)
  status: Status

  @IsNotEmpty()
  @IsString()
  @IsEnum(Priority)
  priority: Priority

  @IsNotEmpty()
  @IsDateString()
  deadline: Date

  @IsNotEmpty()
  owner: User
}
