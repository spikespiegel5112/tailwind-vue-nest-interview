import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoList } from './entities/todolist.entity';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoList)
    private usersRepository: Repository<ToDoList>,
  ) {}
  findAll(): Promise<ToDoList[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<ToDoList | null> {
    return this.usersRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
