import createServer from '../server';
import { AppDataSource } from '../data-source'
import * as supertest from 'supertest'
import { ProjectController } from '../controller/ProjectController';
import { Project } from '../entity/Project';
import { Request, Response, NextFunction } from 'express';

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

const projectInput = {
    name: "project test",
    description: "project test description"
}

const projectInputs = [
    projectInput,
    projectInput,
    projectInput,
    projectInput,
];

let token: string; // token to be used in tests

describe('Authenticated Routes', () => {
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
        // Mock the ProjectController module
        jest.mock('../controller/ProjectController', () => ({
          ProjectController: {
            all: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
              return [projectInput, projectInput];
            }),
            one: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
              return [projectInput];
            }),
          },
        }));
  
        // Call the function
        const { ProjectController } = require('../controller/ProjectController');
  
        describe('get all projects', () => {
          it('should return all projects', async () => {
            const result = await ProjectController.all(req, res, nextMock);

            // Assertions
            expect(result).toEqual([projectInput, projectInput]);
          });
        });
  
        describe('get one project', () => {
            it('should return one project', async () => {
              const result = await ProjectController.one(req, res, nextMock);
            
              // Assertions
              expect(result).toEqual([projectInput]);
            });
        });
  
        describe('get unknown project', () => {
            it('should not return any project', async () => {
              
              const result = await ProjectController.one(req, res, nextMock);
            
              // Assertions
              expect(result).toEqual([projectInput]);
            });
        });
      });
  
      describe('modifying methods', () => {
        jest.mock('../controller/ProjectController', () => {
          return {
            ProjectController: jest.fn().mockImplementation(() => ({
              all: jest.fn()
              .mockImplementation(() => Promise.resolve([projectInput])),
              one: jest.fn()
              .mockImplementation(() => Promise.resolve(projectInput)),
              save: jest.fn()
              .mockImplementation(() => Promise.resolve(true)),
              remove: jest.fn()
              .mockImplementation(() => Promise.resolve("project has been removed")),
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
  
        let projectRepository;

        beforeEach(() => {
            projectRepository = {
              save: jest.fn(),
              findOneBy: jest.fn(),
              remove: jest.fn()
            };
            AppDataSource.getRepository = jest.fn().mockReturnValue(projectRepository);
        });
        
        describe('create project', () => {
            it('should create a project', async () => {
              const req = mockRequest(userInput);
              const res = mockResponse();
      
              const controller = new ProjectController();
              await controller.save(req, res, nextMock);
  
              expect(projectRepository.save).toBeCalled();
            });
        });
  
        describe('remove project', () => {
          it('should remove a project', async () => {
            const projectId = 1;
            projectRepository.findOneBy.mockReturnValueOnce(projectInput);
  
            const req = mockRequestParam(projectId, projectInput);
            const res = mockResponse();
  
            const controller = new ProjectController();
            await controller.remove(req, res, nextMock);
  
            expect(projectRepository.findOneBy).toHaveBeenCalled();
            expect(projectRepository.remove).toHaveBeenCalled();
          });
        });

        describe('remove unknown project', () => {
          it('should not remove any project', async () => {
            const projectId = 1;
            projectRepository.findOneBy.mockReturnValueOnce(undefined);
  
            const req = mockRequestParam(projectId, projectInput);
            const res = mockResponse();
  
            const controller = new ProjectController();
            await controller.remove(req, res, nextMock);
  
            expect(projectRepository.findOneBy).toHaveBeenCalled();
            expect(projectRepository.remove).not.toHaveBeenCalled();
          });
        });
      });
});

describe('Unauthenticated Routes', () => {
    describe('get Project Route', () => {
      it('should not let you get all projects', async () => {
        await request(app)
          .get('/project')
          .expect(401);
      })
      it('should not let you get one of the projects', async () => {
        await request(app)
          .get('/project/1')
          .expect(401);
      })
    });
    describe('create Project Route', () => {
      it('should not let you create a project', async () => {
        await request(app)
          .post('/project')
          .send(projectInput)
          .expect(401);
      })
    });
    describe('remove Project Route', () => {
      it('should not let you remove a project', async () => {
        const projectId = 1;
    
        await request(app)
          .delete(`/project/${projectId}`)
          .expect(401);
      })
    });
  });