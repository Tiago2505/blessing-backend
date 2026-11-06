import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { Auth, GetUser } from './decorators';
import { User } from '../users/entities';
import { ChangeMyPasswordDto, LoginDto, ResetPasswordDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('send-password-reset-code')
  @Auth()
  sendPasswordResetCode(
    @GetUser() user: User
  ){
    return this.authService.sendPasswordResetCode(user);
  }

  @Post('verify-password-reset-code')
  @Auth()
  verifyPasswordResetCode(
    @GetUser('id') userId: number,
    @Body('code') code: string
  ){
    return this.authService.verifyPasswordResetCode(userId, code);
  }

  @Post('reset-password')
  @Auth()
  resetPassword(
    @GetUser('email') email: string,
    @Body() resetPasswordDto: ResetPasswordDto
  ){
    return this.authService.resetPassword(email, resetPasswordDto);
  }

  @Post('me/change-password')
  @Auth()
  changeMyPassword(
    @GetUser() user: User,
    @Body() changeMyPasswordDto: ChangeMyPasswordDto
  ){
    return this.authService.changeMyPassword(user, changeMyPasswordDto);
  }

}
