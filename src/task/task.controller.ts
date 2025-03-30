import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskStatusDto } from './dto/update-task.dto'
import { TaskService } from './task.service'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get()
  async findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskService.findById(+id)
  }

  @Patch(':id/status')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskDto
    return this.taskService.update(+id, status)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(+id)
  }
}
