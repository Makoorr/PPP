import createServer from '../server';
import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import * as supertest from 'supertest'
import { TaskController } from '../controller/TaskController';
import { Task } from '../entity/Task';

const request = require('supertest');
const app = createServer();

const req: Request = {} as Request;
const res: Response = {} as Response;
const nextMock: NextFunction = jest.fn();

const userInput = { // valid user for authentication
    login: "jane.doe",
    password: "password",
    name: "Jane Doe",
};

const taskInput = {
    name: "task test",
    description: "task test description"
};

let token: string; // token to be used in tests

describe('Authenticated Routes', () => {
  describe('Task Routes', () => {
    beforeEach (async () => {
      // Mock the findOne method to simulate an existing user
      const findOneMock = jest
      .spyOn(AppDataSource.manager, 'findOne')
      .mockResolvedValueOnce(userInput);
  
      // Get token
      const response = await supertest(app)
      .post('/auth')
      .send(userInput);
  
      expect(findOneMock).toHaveBeenCalled();
      token = response.body.token;
    });

    describe('get method', () => {
      // Mock the TaskController module
      jest.mock('../controller/TaskController', () => ({
        TaskController: {
          all: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
            return [taskInput, taskInput];
          }),
          one: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
            return [taskInput];
          }),
        },
      }));

      // Call the function
      const { TaskController } = require('../controller/TaskController');

      describe('get all tasks', () => {
        it('should return all tasks', async () => {
          const result = await TaskController.all(req, res, nextMock);
          
          // Assertions
          expect(result).toEqual([taskInput, taskInput]);
        });
      });

      describe('get one task', () => {
          it('should return one task', async () => {
            const result = await TaskController.one(req, res, nextMock);
          
            // Assertions
            expect(result).toEqual([taskInput]);
          });
      });
    });

    describe('modifying methods', () => {
      jest.mock('../controller/TaskController', () => {
        return {
          TaskController: jest.fn().mockImplementation(() => ({
            all: jest.fn()
            .mockImplementation(() => Promise.resolve([taskInput])),
            one: jest.fn()
            .mockImplementation(() => Promise.resolve(taskInput)),
            save: jest.fn()
            .mockImplementation(() => Promise.resolve(true)),
            update: jest.fn()
            .mockImplementation(() => Promise.resolve(true)),
            remove: jest.fn()
            .mockImplementation(() => Promise.resolve("task has been removed")),
          })),
        };
      });

      const mockRequestParam = (params, body) => {
        return {
            params,
            body
        };
      };

      const mockRequest = (body) => {
        return {
            body
        };
      };
      
      const mockResponse = () => {
          let res = {"status": undefined, "json": undefined};
          res.status = jest.fn().mockReturnValue(res);
          res.json = jest.fn().mockReturnValue(res);
          return res;
      };

      let taskRepository;

      beforeEach(() => {
          taskRepository = {
            save: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn()
          };
          AppDataSource.getRepository = jest.fn().mockReturnValue(taskRepository);
      });
      
      describe('create task', () => {
          it('should create a task', async () => {
            const req = mockRequest(userInput);
            const res = mockResponse();
    
            const controller = new TaskController();
            await controller.save(req, res, nextMock);

            expect(taskRepository.save).toBeCalled();
          });
      });
      
      describe('update task', () => {
          it('should update a task', async () => {
            const taskId = 1;
            const updatedTaskData = {
              name: 'Updated Task Name',
              description: 'Updated Task Description',
              priority: 3,
              deadline: '2023-06-30',
            };
            taskRepository.findOneBy.mockReturnValueOnce(updatedTaskData);

            const req = mockRequestParam(taskId, updatedTaskData);
            const res = mockResponse();
    
            const controller = new TaskController();
            await controller.update(req, res, nextMock);

            expect(taskRepository.findOneBy).toBeCalled();
            expect(taskRepository.save).toBeCalled();
          });
        
      });

      describe('remove task', () => {
        it('should remove a task', async () => {
          const taskId = 1;
          taskRepository.findOneBy.mockReturnValueOnce(taskInput);

          const req = mockRequestParam(taskId, taskInput);
          const res = mockResponse();

          const controller = new TaskController();
          await controller.remove(req, res, nextMock);

          expect(taskRepository.findOneBy).toHaveBeenCalled();
          expect(taskRepository.remove).toHaveBeenCalled();
        });
      });

      describe('remove unknown task', () => {
        it('should not remove any task', async () => {
          const taskId = 1;
          taskRepository.findOneBy.mockReturnValueOnce(undefined);

          const req = mockRequestParam(taskId, taskInput);
          const res = mockResponse();

          const controller = new TaskController();
          await controller.remove(req, res, nextMock);

          expect(taskRepository.findOneBy).toHaveBeenCalled();
          expect(taskRepository.remove).not.toHaveBeenCalled();
        });
      });
    });
  });
});

describe('Unauthenticated Routes', () => {
  describe('get Task Route', () => {
    it('should not let you get all tasks', async () => {
      await request(app)
        .get('/task')
        .expect(401);
    })
    it('should not let you get one of the tasks', async () => {
      await request(app)
        .get('/task/1')
        .expect(401);
    })
  });
  describe('create Task Route', () => {
    it('should not let you create a task', async () => {
      await request(app)
        .post('/task')
        .send(taskInput)
        .expect(401);
    })
  });
  describe('update Task Route', () => {
    it('should not let you update a task', async () => {
      const taskId = 1;
      const updatedTaskData = {
        name: 'Updated Task Name',
        description: 'Updated Task Description',
        priority: 3,
        deadline: '2023-06-30',
      };
  
      await request(app)
        .put(`/task/${taskId}`)
        .send(updatedTaskData)
        .expect(401);
    })
  });
  describe('remove Task Route', () => {
    it('should not let you remove a task', async () => {
      const taskId = 1;
  
      await request(app)
        .delete(`/task/${taskId}`)
        .expect(401);
    })
  });
});