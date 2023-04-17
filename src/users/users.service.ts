import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = new User();
    user.email = createUserInput.email;
    user.password = await bcrypt.hash(createUserInput.password, 10);
    return this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findOneBy(query: any) {
    const user = await this.userRepository.findOneBy(query);
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user entity with the new data
    if (updateUserInput.password) {
      user.password = await bcrypt.hash(updateUserInput.password, 10);
    }

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(user);

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const result = await this.userRepository.delete(id);

    return result;
  }
}
