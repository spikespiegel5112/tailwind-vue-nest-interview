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
    return this.ToDoListService.findAll();
  }

  @Post('create')
  async create(@Body() post) {
    if (!post.content) {
      throw new HttpException('content为空', 401);
    }
    return await this.ToDoListService.create({
      content: post.content,
    });
  }

  @Put(':id')
  async update(@Param('id') id, @Body() post) {
    return await this.ToDoListService.updateById(id, post);
  }

  @Delete('id')
  async remove(@Param('id') id) {
    return await this.ToDoListService.remove(id);
  }
}
