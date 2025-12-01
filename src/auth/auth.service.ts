import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { UserInfo } from 'src/common/interfaces/user.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private redis: Redis,
  ) {}

  async register(dto: RegisterUserDto) {
    const user = await this.userService.register(dto);
    return instanceToPlain(user);
  }

  async login(user: UserInfo) {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION')}s`,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION')}s`,
    });

    await this.redis.set(
      user.email,
      refreshToken,
      'EX',
      Number(this.configService.get('JWT_REFRESH_EXPIRATION')),
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(payload: any) {
    const oldRefreshToken: string | null = await this.redis.get(payload.email);
    if (!oldRefreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }

    return await this.login({
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    });
  }
}
