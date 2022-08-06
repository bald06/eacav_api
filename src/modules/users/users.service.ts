import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../entities/UserEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(req: CreateUserDto) {
    const hashPassword = await bcrypt.hash(req.password.toString(), 15);
    req.password = hashPassword;
    const user = this.userRepository.create(req);
    return await this.userRepository.save(user);
  }

  async findOneByEmail(email) {
    return await this.userRepository.findOne({
      where: { email: email, deletedAt: null },
    });
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
    if (!user) {
      return false;
    }
    return user;
  }

  async findUsers() {
    return await this.userRepository.findOne({
      where: { deletedAt: null },
    });
  }

  async updateUserById(id: number, req: UpdateUserDto) {
    const user = await this.findUserById(id);
    if (!user) {
      return false;
    }
    return await this.userRepository.update({ id }, req);
  }

  async deleteUserById(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      return false;
    }
    return await this.userRepository.update({ id }, { deletedAt: Date.now() });
  }
}
