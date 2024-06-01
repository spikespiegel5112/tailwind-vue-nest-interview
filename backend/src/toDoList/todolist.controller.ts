import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Response,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ToDoListService } from './todolist.service';

@Controller('todolist')
export class ToDoListController {
  constructor(private readonly ToDoListService: ToDoListService) {}

  @Get('get')
  findAll(): any {
    // return this.ToDoListService.findAll();
    return this.ToDoListService.findAllFromRedis();
  }

  @Post('create')
  async create(@Body() post) {
    if (!post.content) {
      throw new HttpException('content为空', 401);
    }
    return await this.ToDoListService.createToRedis(post);
  }

  @Put('updateToRedis')
  async update(@Body() post) {
    return await this.ToDoListService.updateByIdToRedis(post);
  }

  @Delete('deleteToDoListFromRedis')
  async deleteToDoListFromRedis(@Body() post) {
    return await this.ToDoListService.deleteToDoListByContentNameFromRedis(post);
  }
}
