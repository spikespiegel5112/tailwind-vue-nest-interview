import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoListEntity } from './entities/todolist.entity';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(ToDoListEntity)
    private toDoListRepository: Repository<ToDoListEntity>,
  ) {}
  findAll(): Promise<ToDoListEntity[]> {
    return this.toDoListRepository.find();
  }
  findOne(id: number): Promise<ToDoListEntity | null> {
    return this.toDoListRepository.findOneBy({ id });
  }
  // 创建
  async create(post: Partial<ToDoListEntity>): Promise<ToDoListEntity> {
    console.log(post);
    return await this.toDoListRepository.save(post);
  }
  // 更新
  async updateById(post): Promise<ToDoListEntity> {
    const existPost = await this.toDoListRepository.findOne({
      where: {
        id: post.id,
      },
    });
    if (!existPost) {
      throw new HttpException(`id为${post.id}的内容不存在`, 401);
    }
    const updatePost = this.toDoListRepository.merge(existPost, post);
    return this.toDoListRepository.save(updatePost);
  }
  async remove(id: number): Promise<void> {
    await this.toDoListRepository.delete(id);
  }

  // 创建
  async createToRedis(post: Partial<ToDoListEntity>): Promise<object> {
    console.log(post);
    const contentName = `content_${uuidv4().replaceAll('-', '')}`;

    try {
      const payload = {
        content: post.content,
        checked: false,
      };
      await this.redis.hset('todolist', contentName, JSON.stringify(payload));
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
    return {
      contentName: contentName,
      content: post.content,
    };
  }

  // 查询
  async findAllFromRedis(): Promise<object> {
    let resultFromRedis: Record<string, string>;
    try {
      resultFromRedis = await this.redis.hgetall('todolist');
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
    const result = [];
    Object.keys(resultFromRedis).forEach((item: string) => {
      result.push({
        contentName: item,
        ...JSON.parse(resultFromRedis[item]),
      });
    });
    return result;
  }

  // 更新
  async updateByIdToRedis(post): Promise<any> {
    const existPost = await this.redis.hget('todolist', post.contentName);
    console.log(existPost);
    const existPostObject = JSON.parse(existPost);
    if (!existPost) {
      throw new HttpException(`id为${post.contentName}的内容不存在`, 401);
    }
    const payload = {
      ...existPostObject,
      content: post.content,
    };
    await this.redis.hset(
      'todolist',
      post.contentName,
      JSON.stringify(payload),
    );
    return payload;
  }

  // 删除
  async deleteToDoListByContentNameFromRedis(post): Promise<any> {
    const existPost = await this.redis.hget('todolist', post.contentName);
    console.log(existPost);
    const existPostObject = JSON.parse(existPost);
    if (!existPost) {
      throw new HttpException(`id为${post.contentName}的内容不存在`, 401);
    }
    await this.redis.hdel('todolist', post.contentName);
    return {
      contentName: post.contentName,
    };
  }
}
