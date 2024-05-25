import { ToDoListService } from './todolist.service';

export class ToDoListGateway {
  constructor(private chatService: ToDoListService) {}

  afterInit(server) {}
}
