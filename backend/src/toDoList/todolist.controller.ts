import { Controller, Get, Response, Body, HttpStatus } from '@nestjs/common';
import { ToDoListService } from './todolist.service';

@Controller('todolist')
export class ToDoListController {
  constructor(private readonly ToDoListService: ToDoListService) {}

  @Get('get')
  findAll(): any {
    return this.ToDoListService.findAll();
  }
}
