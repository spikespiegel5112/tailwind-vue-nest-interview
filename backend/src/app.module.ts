import { Module } from '@nestjs/common';
import { ToDoListModule } from './ToDoList/todolist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    ToDoListModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      options: {
        password: '123456',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'baobaojs.com',
      port: 3306,
      username: 'todo-list',
      password: '8jxETniXpfzrXNSt',
      database: 'todo-list',
      entities: ['dist/**/ToDoList/entities/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
