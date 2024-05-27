import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoListService } from './todolist.service';
import { ToDoListController } from './todolist.controller';
import { ToDoListGateway } from './todolist.gateway';
import { ToDoListEntity } from './entities/todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoListEntity])],
  exports: [TypeOrmModule],
  controllers: [ToDoListController],
  providers: [ToDoListGateway, ToDoListService],
})
export class ToDoListModule {}
