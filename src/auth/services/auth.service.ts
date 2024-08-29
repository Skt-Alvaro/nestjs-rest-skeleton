import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';
import { LoginAuthDto } from '../dto/login.dto';
import { PayloadToken } from 'src/types/token';
import config from 'src/config';
import { RefreshDto } from '../dto/refresh.dto';
import { RegisterAuthDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private jwtService: JwtService,
  ) {}

  async login(args: LoginAuthDto) {
    const user = await this.usersService.findByEmail(args.email);

    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(args.password, user.password);

    if (!isMatch) throw new HttpException('Incorrect password', 403);

    const payload = { email: user.email, username: user.username };

    return this.generateTokens(payload);
  }

  async register(args: RegisterAuthDto) {
    const user = await this.usersService.create(args);

    if (user) {
      const payload = { email: args.email, username: args.username };

      return this.generateTokens(payload);
    }
  }

  async refresh(args: RefreshDto) {
    const token: any = this.jwtService.decode(args.refresh_token);

    // invalidate old token
    token.exp = Date.now() / 1000;

    // Check if token is valid
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    // Check if token is expired
    if (token.exp < Date.now() / 1000) {
      throw new TokenExpiredError('Token expired', new Date(token.exp * 1000));
    }

    if (token.email) {
      const payload = { email: token.email, username: token.username };
      return this.generateTokens(payload);
    }
  }

  private generateTokens(payload: PayloadToken) {
    return {
      access_token: this.generateAccessToken(payload),
      refresh_token: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: PayloadToken): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwt.secret,
      expiresIn: this.configService.jwt.expiration,
    });
  }

  private generateRefreshToken(payload: PayloadToken): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.jwt.refreshSecret,
      expiresIn: this.configService.jwt.refreshExpiration,
    });
  }
}
