import { Module } from '@nestjs/common';
import { ToDoListModule } from './toDoList/todolist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ToDoList } from './toDoList/entities/todolist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'baobaojs.com',
      port: 3306,
      username: 'todo-list',
      password: '8jxETniXpfzrXNSt',
      database: 'todo-list',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ToDoListModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
