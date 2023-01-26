import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.HASH_SALT),
    );

    return this.usersService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (user) {
      if (await bcrypt.compare(loginUserDto.password, user.password)) {
        return user;
      }
    }
    throw new UnauthorizedException();
  }
}
