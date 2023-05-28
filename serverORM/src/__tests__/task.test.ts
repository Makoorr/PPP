import createServer from '../server';
import { AppDataSource } from '../data-source'
import { Any, DataSource } from "typeorm";
import * as supertest from 'supertest'
import { TaskController } from '../controller/TaskController';
import { Task } from '../entity/Task';

const request = require('supertest');
const app = createServer();

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

      describe('get all tasks', () => {
        it('should return all tasks', async () => {
          await request(app)
            .get('/task')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        });
      });

      describe('get one task', () => {
          it('should return one task', async () => {
            await request(app)
              .get('/task/1')
              .set('Authorization', `Bearer ${token}`)
              .expect(200);
          });
      });
      
      describe('create task', () => {
          it('should create a task', async () => {
            await request(app)
              .post('/task')
              .set('Authorization', `Bearer ${token}`)
              .send(taskInput)
              .expect(200);

              expect(TaskController).toHaveBeenCalled();
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
        
            await request(app)
              .put(`/task/${taskId}`)
              .set('Authorization', `Bearer ${token}`)
              .send(updatedTaskData)
              .expect(200);

            expect(TaskController).toHaveBeenCalled();
          });
        
      });

      describe('remove task', () => {
        it('should remove a task', async () => {
          const taskId = 1;
      
          await request(app)
            .delete(`/task/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
      
          expect(TaskController).toHaveBeenCalled();
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