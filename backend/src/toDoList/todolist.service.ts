import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoListEntity } from './entities/todolist.entity';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ToDoListService {
  hashName: string;
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
    @InjectRepository(ToDoListEntity)
    private toDoListRepository: Repository<ToDoListEntity>,
  ) {
    this.hashName = 'todolist';
  }
  findAll(): Promise<ToDoListEntity[]> {
    return this.toDoListRepository.find();
  }
  findOne(id: number): Promise<ToDoListEntity | null> {
    return this.toDoListRepository.findOneBy({ id });
  }
  // 创建
  async create(post: Partial<ToDoListEntity>): Promise<ToDoListEntity> {
    return await this.toDoListRepository.save(post);
  }
  // 更新
  async updateByContentName(post): Promise<ToDoListEntity> {
    const existPost = await this.toDoListRepository.findOne({
      where: {
        contentName: post.contentName,
      },
    });
    if (!existPost) {
      throw new HttpException(`id为${post.id}的内容不存在`, 401);
    }
    const updatePost = this.toDoListRepository.merge(existPost, post);
    return this.toDoListRepository.save(updatePost);
  }

  // 删除
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
        isNew: true,
      };
      await this.redis.hset(
        this.hashName,
        contentName,
        JSON.stringify(payload),
      );
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
    console.log(this.hashName);
    let resultFromRedis: Record<string, string>;
    try {
      resultFromRedis = await this.redis.hgetall(this.hashName);
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
  async updateByContentNameToRedis(post): Promise<any> {
    const existPost = await this.redis.hget(this.hashName, post.contentName);
    console.log(existPost);
    const existPostObject = JSON.parse(existPost);
    if (!existPost) {
      throw new HttpException(`id为${post.contentName}的内容不存在`, 401);
    }
    const payload = {
      ...existPostObject,
      checked: post.checked,
      content: post.content,
    };
    await this.redis.hset(
      this.hashName,
      post.contentName,
      JSON.stringify(payload),
    );
    const data: string = await this.redis.hget(this.hashName, post.contentName);
    console.log(data);
    return {
      ...JSON.parse(data),
      contentName: post.contentName,
    };
  }

  // 删除
  async deleteToDoListByContentNameFromRedis(post): Promise<any> {
    const existPost = await this.redis.hget('todolist', post.contentName);
    console.log(existPost);
    if (!existPost) {
      throw new HttpException(`id为${post.contentName}的内容不存在`, 401);
    }
    await this.redis.hdel('todolist', post.contentName);
    return {
      contentName: post.contentName,
    };
  }

  async synchronizeData(): Promise<any> {
    const allDatabaseData = await this.findAll();
    console.log('=====allDatabaseData=====');
    const toDoListData = await this.redis.hgetall('todolist');
    console.log('=====synchronizeData=====');
    Object.keys(toDoListData).forEach(async (item: any) => {
      let data = JSON.parse(toDoListData[item]);
      data = {
        ...data,
        contentName: item,
      };
      if (data.isNew) {
        await this.create(data);
      } else {
        console.log(data.content);
        await this.updateByContentName(data);
      }

      data.isNew = false;
      this.redis.hset(this.hashName, item, JSON.stringify(data));
    });
    const todolistArr = Object.keys(toDoListData).map((item2) => {
      return {
        ...JSON.parse(toDoListData[item2]),
        contentName: item2,
      };
    });
    const deleteList: any[] = allDatabaseData.filter((item: ToDoListEntity) => {
      return !todolistArr.some(
        (item2: any) => item2.contentName === item.contentName,
      );
    });
    console.log('======deleteList=====');
    console.log(deleteList);
    deleteList.forEach(async (item: ToDoListEntity) => {
      await this.toDoListRepository.remove(item);
    });
    return {};
  }

  async synchronizeDataToRedis(payload: any[]): Promise<any> {
    console.log('=====synchronizeData=====');
    payload.forEach(async (item: any) => {
      await this.redis.hset(
        this.hashName,
        item.contentName,
        JSON.stringify({
          checked: item.checked,
          content: item.content,
          isNew: false,
        }),
      );
    });
    return {};
  }
}
