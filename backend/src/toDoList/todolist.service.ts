import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoListEntity } from './entities/todolist.entity';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRepository(ToDoListEntity)
    private toDoListRepository: Repository<ToDoListEntity>,
  ) {}
  findAll(): Promise<ToDoListEntity[]> {
    return this.toDoListRepository.find();
  }
  findOne(id: number): Promise<ToDoListEntity | null> {
    return this.toDoListRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    await this.toDoListRepository.delete(id);
  }

  async createToDo(createToDoInput: ToDoListEntity): Promise<ToDoListEntity> {
    const newPet = this.toDoListRepository.create(createToDoInput); // initialising new pet object
    return this.toDoListRepository.save(newPet); // saving new pet object in db
  }

  // 创建文章
  async create(post: Partial<ToDoListEntity>): Promise<ToDoListEntity> {
    return await this.toDoListRepository.save(post);
  }

  async updateById(post): Promise<ToDoListEntity> {
    const existPost = await this.toDoListRepository.findOne({
      where: {
        id: post.id,
      },
    });
    if (!existPost) {
      throw new HttpException(`id为${post.id}的文章不存在`, 401);
    }
    const updatePost = this.toDoListRepository.merge(existPost, post);
    return this.toDoListRepository.save(updatePost);
  }
}
