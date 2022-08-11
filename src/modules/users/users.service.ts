import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../entities/UserEntity';
import { UserRole } from 'src/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}
  async create(req: CreateUserDto) {
    const hashPassword = await bcrypt.hash(req.password.toString(), 15);
    req.password = hashPassword;
    if (!req.role) {
      req.role = UserRole.CLIENT;
    } else {
      req.role = UserRole.ADMIN;
    }
    const user = this.userEntity.create(req);
    return await this.userEntity.save(user);
  }

  async findOneByEmail(email) {
    return await this.userEntity.findOne({
      where: { email: email, deletedAt: null },
    });
  }

  async findUserById(id: number) {
    const user = await this.userEntity.findOne({
      where: { id, deletedAt: null },
    });
    if (!user) {
      return false;
    }
    return user;
  }

  async findUsers(role: UserRole) {
    return await this.userEntity.findOne({
      where: { deletedAt: null, role },
    });
  }

  async updateUserById(id: number, req: UpdateUserDto) {
    const user = await this.findUserById(id);
    if (!user) {
      return false;
    }
    req.updatedAt = new Date(Date.now());
    return await this.userEntity.update({ id }, req);
  }

  async deleteUserById(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      return false;
    }
    return await this.userEntity.update(
      { id },
      { deletedAt: new Date(Date.now()) },
    );
  }
}
