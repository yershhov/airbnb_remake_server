import { Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { UserSignInCredentialsDataModel } from 'src/users/interfaces/UserSignInCredentials.dataModel';
import { UserDataModel } from 'src/users/interfaces/User.dataModel';

async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, Number(process.env.HASH_SALT));
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(user: UserDataModel): Promise<User> {
    const hashed = await hash(user.password);

    return await this.usersService.createUser({ ...user, password: hashed });
  }

  async signIn(user: UserSignInCredentialsDataModel) {
    const getUser = await this.usersService.findOne(user.email);
    if (getUser !== null) {
      if (await bcrypt.compare(user.password, getUser.password)) {
        return getUser;
      }
      return 'wrong pass';
    } else {
      return 'wrong username';
    }
  }
}
