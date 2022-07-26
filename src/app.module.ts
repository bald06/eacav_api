import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './orders/orders.module';

import { GlobalService } from './app.service';

import { UserEntity } from './entities/UserEntity';
import { ProductsEntity } from './entities/ProductsEntity';
import { AddressEntity } from './entities/AddressEntity';
import { OrderEntity } from './entities/OrderEntity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [UserEntity, ProductsEntity, AddressEntity, OrderEntity],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  exports: [GlobalService],
  controllers: [],
  providers: [GlobalService],
})
export class AppModule {}
