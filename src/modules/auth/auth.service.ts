import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password.toString());
      if (isMatch) {
        const { password, ...res } = user;
        return res;
      }
    }
    return null;
  }

  async generateJWT(user: any) {
    const payload = await { email: user.email, sub: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
