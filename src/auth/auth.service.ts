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
    return user;
  }

  async login(user: UserInfo) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const expiresRefresh = new Date();
    expiresRefresh.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_REFRESH_EXPIRATION'),
    );

    const accessToken = await this.jwtService.signAsync(user);

    const refreshToken = await this.jwtService.signAsync(user, {
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION')}s`,
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    await this.redis.set(user.email!, refreshToken, 'EX', 10000);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const decodedUser = this.jwtService.decode<TokenPayload>(refreshToken);

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const oldRefreshToken: string | null = await this.redis.get(
      decodedUser.email,
    );

    if (oldRefreshToken !== refreshToken) {
      throw new UnauthorizedException(
        'Authentication credentials were missing or incorrect',
      );
    }

    return await this.login({
      id: decodedUser.userId,
      email: decodedUser.email,
    });
  }
}
