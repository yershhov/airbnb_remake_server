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
import { CreateUserDto as SignUpDto } from 'src/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(): Promise<string> {
    return 'a';
  }

  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const newUser = await this.authService.signUp(signUpDto);
    return res.json(newUser);
  }
}
