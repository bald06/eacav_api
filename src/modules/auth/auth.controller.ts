import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginDto, @Res() res: Response) {
    try {
      const validation = await this.authService.validateUser(
        req.email.toString(),
        req.password.toString(),
      );
      const response = await this.authService.generateJWT(validation);
      return res.status(HttpStatus.OK).json({
        response,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }
  }
}
