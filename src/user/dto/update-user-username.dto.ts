import { PartialType } from '@nestjs/mapped-types'
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserUsernameDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string
}
