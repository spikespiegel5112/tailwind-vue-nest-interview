import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListService } from './todolist.service';
import { ToDoListController } from './todolist.controller';
import { ToDoListGateway } from './todolist.gateway';
import { ToDoList } from './entities/todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoList])],
  exports: [TypeOrmModule],
  controllers: [ToDoListController],
  providers: [ToDoListGateway, ToDoListService],
})
export class ToDoListModule {}
