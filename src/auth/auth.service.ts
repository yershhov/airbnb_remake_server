import { Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, Number(process.env.HASH_SALT));
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(user: User): Promise<User> {
    const hashed = await hash(user.password);

    return await this.usersService.createUser({ ...user, password: hashed });
  }

  async signIn(user: User) {
    const getUser = await this.usersService.findOne(user.username);
    if (getUser !== null) {
      if (await bcrypt.compare(user.password, getUser.password)) {
        return getUser;
      }
      return null;
    } else {
      return null;
    }
  }
}
