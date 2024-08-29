import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import config from 'src/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: configService.jwt.expiration,
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
