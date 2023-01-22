import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { User } from 'src/models/user/user.schema';
import { CreateUserDto as SignUpDto } from 'src/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.userService.create(signUpDto);
    return user;
  }
}
