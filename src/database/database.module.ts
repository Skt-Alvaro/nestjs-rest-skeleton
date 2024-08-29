import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, database, username, password } =
          configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          database,
          username,
          password,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
