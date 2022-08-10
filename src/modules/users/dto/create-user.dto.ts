import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  secondName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  role: UserRole;
}
