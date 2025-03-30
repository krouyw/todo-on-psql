import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) {
      this.logger.warn(`User with id=${id} not found`)
      throw new NotFoundException(`User ${id} not found`)
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email })
  }

  async update(id: number, username: string): Promise<User> {
    const updateUser = await this.usersRepository.update(id, { username })
    if (!updateUser.affected) {
      this.logger.warn(`User with id=${id} not found or error when changing`)
      throw new NotFoundException(`User ${id} not found or error when changing`)
    }

    return this.findById(id)
  }

  async delete(id: number): Promise<User> {
    const deleteUser = await this.usersRepository.delete(id)
    if (!deleteUser.affected) {
      this.logger.warn(`User with id=${id} not found or error when deleting`)
      throw new NotFoundException(`User ${id} not found or error when deleting`)
    }

    return this.findById(id)
  }
}
