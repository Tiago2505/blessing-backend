import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptAdapter } from '../common/config';
import { handleError } from '../common/helpers';
import { User } from './entities';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {

    try {
      const {email, password} = createUserDto;
  
      const userExists = await this.userRepository.findOne({
        where: {email}
      });
  
      if(userExists) throw new ConflictException('Email already exists');
  
      createUserDto.password = BcryptAdapter.hash(password);
  
      const newUser = this.userRepository.create(createUserDto);
  
      await this.userRepository.save(newUser);

      return newUser;
      
    } catch (error) {
      handleError(error);
    }
  }

  findAll() {
    try {
      return this.userRepository.find({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isActive: true
        }
      });

    } catch (error) {
      handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({where: {id}});
      if(!user) throw new NotFoundException(`user with id: ${id} not found`);

      const {password, ...properties} = user;

      return properties;
    } catch (error) {
      handleError(error);
    }
  }

  async findByEmail(email: string){
    try {
      const user = await this.userRepository.findOne({where: {email}});

      if(!user) throw new NotFoundException(`user with email: ${email} not found`);

      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    try {

      await this.findOne(id);

      await this.userRepository.update(id, updateUserDto);

      return this.findOne(id);

    } catch (error) {
      handleError(error);
    }

  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.userRepository.update(id, {
        isActive: false
      });

      return this.findOne(id);
    } catch (error) {
      handleError(error);
    }
  }

  async changePassword(email: string, newPassword: string){
    try {
      

      const user = await this.findByEmail(email);

      newPassword = BcryptAdapter.hash(newPassword);

      await this.userRepository.update(user.id, {
        password: newPassword
      });

      const {password, ...properties} = user;

      return properties;

    } catch (error) {
      handleError(error);
    }
  } 
  
}
