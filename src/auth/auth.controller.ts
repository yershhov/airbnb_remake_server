import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/users.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() user: User) {
    return await this.authService.signUp(user);
  }

  @Post('signIn')
  async signIn(@Body() user: User) {
    return await this.authService.signIn(user);
  }
}
