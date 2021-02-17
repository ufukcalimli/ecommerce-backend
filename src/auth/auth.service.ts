import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.getUserByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
