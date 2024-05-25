import { Test, TestingModule } from '@nestjs/testing';
import { ToDoListController } from './todolist.controller';
import { ToDoListService } from '../todolist.service';

describe('ToDoListController', () => {
  let controller: ToDoListController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ToDoListController],
      providers: [ToDoListService],
    }).compile();

    const toDoController: ToDoListController =
      app.get<ToDoListController>(ToDoListController);
  });
});


// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

