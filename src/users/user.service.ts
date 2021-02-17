import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // get all
  async getAllUsers(): Promise<User[] | undefined> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async getUserByUserName(username: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ username });
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  // post
  async createUser(user: User): Promise<User> {
    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  // put
  async updateUser(username: string, user: User): Promise<User> {
    try {
      const currentUser = await this.userRepository.findOne({ username });
      if (!currentUser) {
        throw new HttpException(
          'Could not find a user with given credentials',
          HttpStatus.NOT_FOUND,
        );
      }
      const newUser: User = {
        ...currentUser,
        ...user,
      };
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  // delete
  async deleteUser(username: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ username });
      if (!user) {
        throw new HttpException(
          'Could not find a user with given credentials',
          HttpStatus.NOT_FOUND,
        );
      }
      this.userRepository.remove(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
