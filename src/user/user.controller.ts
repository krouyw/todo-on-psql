import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserUsernameDto } from './dto/update-user-username.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email)
    if (user) {
      throw new BadRequestException('This email already exist')
    }

    return this.userService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(+id)
  }

  @Patch(':id/username')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserUsernameDto,
  ) {
    const { username } = updateUserDto
    return this.userService.update(+id, username)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(+id)
  }
}
