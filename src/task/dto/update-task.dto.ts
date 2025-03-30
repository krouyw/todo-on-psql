import { PartialType } from '@nestjs/mapped-types'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Status } from 'src/enum/task.enum'
import { CreateTaskDto } from './create-task.dto'

export class UpdateTaskStatusDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Status)
  status: Status
}
