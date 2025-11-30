import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { UserInfo } from 'src/common/interfaces/user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserInfo) {
    return await this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get new access token' })
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async getRefreshToken(@CurrentUser() userPayload: UserInfo) {
    return await this.authService.refreshToken(userPayload);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserInfo) {
    return user;
  }
}
