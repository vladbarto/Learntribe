import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    try {
      // Verifică dacă rolul este valid
      if (!['student', 'teacher'].includes(registerDto.role)) {
        throw new BadRequestException('Role must be student or teacher');
      }

      const user = await this.authService.createUser(registerDto);
      return { user };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Already existing username or password');
      }
      throw error;
    }
  }
}