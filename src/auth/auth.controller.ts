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

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account. Typically via a signup form.',
  })
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user using email and password, returns access and refresh tokens.',
  })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserInfo) {
    return await this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Generates a new access token using a valid refresh token. Refresh token must be sent in Authorization header as Bearer token.',
  })
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async getRefreshToken(@CurrentUser() userPayload: UserInfo) {
    return await this.authService.refreshToken(userPayload);
  }

  @ApiOperation({
    summary: 'Get user profile',
    description:
      'Returns the profile information of the currently authenticated user. Requires a valid access token.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: UserInfo) {
    return user;
  }
}
