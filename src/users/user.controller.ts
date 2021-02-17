import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}
  // GET users
  @Get()
  async getAllUsers(): Promise<User[] | undefined> {
    return await this.userService.getAllUsers();
  }

  // GET user
  @Get(':username')
  async getUser(
    @Param('username') username: string,
  ): Promise<User | undefined> {
    return await this.userService.getUserByUserName(username);
  }

  // POST user
  @Post()
  async postUser(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }

  // PUT user
  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() user: User,
  ): Promise<User> {
    return await this.userService.updateUser(username, user);
  }

  // DELETE user
  @Delete(':username')
  async deleteUser(@Param('username') username: string): Promise<void> {
    return await this.userService.deleteUser(username);
  }
}
