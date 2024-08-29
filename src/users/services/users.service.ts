import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { SuccessResponse } from 'src/utils/responses';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SuccessResponse> {
    try {
      const password = await bcrypt.hash(createUserDto.password, 10);

      const user: User = this.userRepository.create({
        ...createUserDto,
        password,
      });

      this.userRepository.save(user);

      return { status: 'ok' };
    } catch (error) {
      return { status: 'fail', message: error.message };
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse> {
    try {
      const user = await this.findOne(id);

      this.userRepository.update(user, { ...updateUserDto });

      return { status: 'ok' };
    } catch (error) {
      return { status: 'fail', message: error.message };
    }
  }

  async remove(id: number): Promise<SuccessResponse> {
    try {
      const user = await this.findOne(id);

      await this.userRepository.remove(user);

      return { status: 'ok' };
    } catch (error) {
      return { status: 'fail', message: error.message };
    }
  }
}
