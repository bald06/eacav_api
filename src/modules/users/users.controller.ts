import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { AppController } from '../../app.controller';
import { UserEntity } from '../../entities/UserEntity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../../enums/roles.enum';

@Controller('users')
export class UsersController extends AppController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  async create(
    @Body() request: CreateUserDto,
    @Res() res: Response,
  ): Promise<UserEntity> {
    try {
      const user = await this.usersService.create(request);
      return this.responseOk(Object(user), res);
    } catch (error) {
      console.log(error);
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Get('/:id')
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<UserEntity> {
    try {
      const user = await this.usersService.findUserById(id);
      if (!user) {
        return this.responseErrorWithMessage('El usuario no existe', res);
      }
      return this.responseOk(Object(user), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Post('/list/:role?')
  async getUsers(
    @Res() res: Response,
    @Param('role') role: UserRole,
  ): Promise<UserEntity[]> {
    try {
      const user = await this.usersService.findUsers(role);
      return this.responseOk(Object(user), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Patch('/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() request: UpdateUserDto,
    @Res() res: Response,
  ): Promise<UserEntity> {
    try {
      const user = await this.usersService.updateUserById(id, request);
      if (!user) {
        return this.responseErrorWithMessage('El usuario no existe', res);
      }
      return this.responseOk(Object(user), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Delete('/:id')
  async deleteUserById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<UserEntity> {
    try {
      const user = await this.usersService.deleteUserById(id);
      if (!user) {
        return this.responseErrorWithMessage('El usuario no existe', res);
      }
      return this.responseOk(Object(user), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }
}
