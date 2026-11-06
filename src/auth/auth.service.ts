import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { handleError } from '../common/helpers';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { ChangeMyPasswordDto, LoginDto, ResetPasswordDto } from './dtos';
import { BcryptAdapter } from '../common/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities';
import { JwtPayload } from './interfaces';
import { VerificationCodeService } from '../verification-code/verification-code.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);

      const jwtPayload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token = this.jwtService.sign(jwtPayload);

      return {
        user,
        token,
      };
    } catch (error) {
      handleError(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email } = loginDto;

      const { password, ...properties } =
        await this.userService.findByEmail(email);

      if (!BcryptAdapter.compare(loginDto.password, password))
        throw new UnauthorizedException('Incorrect password');

      const jwtPayload: JwtPayload = {
        id: properties.id,
        email: properties.email,
        name: properties.name,
        role: properties.role,
      };
      const token = this.jwtService.sign(jwtPayload);

      return {
        user: properties,
        token,
      };
    } catch (error) {
      handleError(error);
    }
  }

  sendPasswordResetCode(user: User) {
    try {
      return this.verificationCodeService.createNewPasswordReset(
        user.id,
        user.email,
      );
    } catch (error) {
      handleError(error);
    }
  }

  async verifyPasswordResetCode(userId: number, code: string) {
    try {
      const verifiedCode = await this.verificationCodeService.verifyCode(
        userId,
        code,
      );

      const passwordResetToken = this.jwtService.sign(verifiedCode!.code);

      return {
        code: verifiedCode,
        passwordResetToken,
      };
    } catch (error) {
      handleError(error);
    }
  }

  resetPassword(email: string, resetPasswordDto: ResetPasswordDto) {
    try {
      const { newPassword, confirmPassword, token } = resetPasswordDto;

      if (newPassword !== confirmPassword)
        throw new BadRequestException(
          'The new password and confirmation password do not match',
        );

      const passwordResetTokenPayload = this.jwtService.verify(token);

      if (!passwordResetTokenPayload.code)
        throw new UnauthorizedException('Invalid password reset token');

      return this.userService.changePassword(email, newPassword);
    } catch (error) {
      handleError(error);
    }
  }

  changeMyPassword(user: User, changeMyPasswordDto: ChangeMyPasswordDto) {
    try {
      const { currentPassword, newPassword, confirmPassword } =
        changeMyPasswordDto;

      if (newPassword !== confirmPassword)
        throw new BadRequestException(
          'The new password and confirmation password do not match',
        );

      if (!BcryptAdapter.compare(currentPassword, user.password))
        throw new UnauthorizedException('Current password is incorrect');

      return this.userService.changePassword(user.email, newPassword);
    } catch (error) {
      handleError(error);
    }
  }
}
