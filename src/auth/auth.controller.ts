import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserDataModel } from 'src/users/interfaces/User.dataModel';
import { UserSignInCredentialsDataModel } from 'src/users/interfaces/UserSignInCredentials.dataModel';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @HttpCode(201)
  async signUp(@Body() user: UserDataModel) {
    return await this.authService.signUp(user);
  }

  @Post('signIn')
  async signIn(@Body() user: UserSignInCredentialsDataModel) {
    return await this.authService.signIn(user);
  }
}
