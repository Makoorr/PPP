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
        all: jest.fn(),
        one: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
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
    beforeAll (async () => {
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
        console.log('token_project: '+token)
      });
    
    describe('Task Routes', () => {
        describe('GET /task', () => {
            it('should return all tasks', async () => {
                // const mockInstance = new TaskController();

                console.log('token_verif TASK: '+token);
                request(app)
                .get('/task')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

                // .end(function(err, res) {
                //     if (err) throw err;
                //     console.log(res.body);
                // });

                // expect(mockInstance.all).toHaveBeenCalled();
                
                // expect(response.status).toBe(200);
                // expect(response.body).toEqual(taskInput);
            });
        });
    });
});