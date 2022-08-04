import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { environments } from './config/environments';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: environments.HOST,
      port: environments.PORT_DB,
      username: environments.USERNAME,
      password: environments.PASSWORD,
      database: environments.DATABASE,
      entities: [],
      synchronize: environments.SYNCHRONIZE,
      autoLoadEntities: environments.AUTOLOAD_ENTITIES,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
