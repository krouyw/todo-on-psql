import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Status } from 'src/enum/task.enum'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name)

  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto)
    return this.tasksRepository.save(task)
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find()
  }

  async findById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id })
    if (!task) {
      this.logger.warn(`Task with id=${id} not found`)
      throw new NotFoundException(`Task ${id} not found`)
    }

    return task
  }

  async update(id: number, status: Status): Promise<Task> {
    const updateTask = await this.tasksRepository.update(id, {
      status,
      isEdited: true,
    })
    if (!updateTask.affected) {
      this.logger.warn(`Task with id=${id} not found or error when changing`)
      throw new NotFoundException(`Task ${id} not found or error when changing`)
    }

    return this.findById(id)
  }

  async delete(id: number): Promise<Task> {
    const deleteTask = await this.tasksRepository.delete(id)
    if (!deleteTask.affected) {
      this.logger.warn(`Task with id=${id} not found or error when deleting`)
      throw new NotFoundException(`Task ${id} not found or error when deleting`)
    }

    return this.findById(id)
  }
}
