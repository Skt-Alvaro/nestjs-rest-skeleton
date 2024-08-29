import { ConfigType } from '@nestjs/config';
import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginAuthDto } from '../dto/login.dto';
import { RegisterAuthDto } from '../dto/register.dto';
import { RefreshDto } from '../dto/refresh.dto';
import config from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Post('login')
  async login(
    @Body() args: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login(args);

    response.cookie('is_logged_in', 'true', {
      domain: this.configService.frontend.host,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('access_token', access_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('refresh_token', refresh_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day
    });

    return { status: 'ok' };
  }

  @Post('register')
  async register(
    @Body() args: RegisterAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.register(args);

    response.cookie('is_logged_in', 'true', {
      domain: this.configService.frontend.host,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('access_token', access_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('refresh_token', refresh_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day
    });

    return { status: 'ok' };
  }

  @Post('signOut')
  async signOut(@Req() req) {
    req.res.cookie('is_logged_in', 'true', {
      domain: this.configService.frontend.host,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(), // system date
    });

    req.res.cookie('access_token', req.cookies.access_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(), // system date
    });

    req.res.cookie('refresh_token', req.cookies.refresh_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(), // system date
    });

    return { status: 'ok' };
  }

  @Post('refresh')
  async refresh(
    @Body() args: RefreshDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } =
      await this.authService.refresh(args);

    response.cookie('is_logged_in', 'true', {
      domain: this.configService.frontend.host,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('access_token', access_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 10 * 24 * 60 * 1000), // 10 day
    });

    response.cookie('refresh_token', refresh_token, {
      domain: this.configService.frontend.host,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day
    });

    return { status: 'ok', access_token, refresh_token };
  }
}
