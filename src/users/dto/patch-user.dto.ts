import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//fully inherits from createUserDto
export class PatchUserDto extends PartialType(CreateUserDto) {}
