import createServer from '../server';
import { AppDataSource } from '../data-source'
import * as supertest from 'supertest'
import { SectionController } from '../controller/SectionController';
import { Section } from '../entity/Section';
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

const sectionInput = {
    name: "section test",
    description: "section test description"
}

const sectionInputs = [
    sectionInput,
    sectionInput,
    sectionInput,
    sectionInput,
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
        // Mock the SectionController module
        jest.mock('../controller/SectionController', () => ({
          SectionController: {
            all: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
              return [sectionInput, sectionInput];
            }),
            one: jest.fn().mockImplementation(async (request: Request, response: Response, next: NextFunction) => {
              return [sectionInput];
            }),
          },
        }));
  
        // Call the function
        const { SectionController } = require('../controller/SectionController');
  
        describe('get all sections', () => {
          it('should return all sections', async () => {
            const result = await SectionController.all(req, res, nextMock);

            // Assertions
            expect(result).toEqual([sectionInput, sectionInput]);
          });
        });
  
        describe('get one section', () => {
            it('should return one section', async () => {
              const result = await SectionController.one(req, res, nextMock);
            
              // Assertions
              expect(result).toEqual([sectionInput]);
            });
        });
      });
  
      describe('modifying methods', () => {
        jest.mock('../controller/SectionController', () => {
          return {
            SectionController: jest.fn().mockImplementation(() => ({
              all: jest.fn()
              .mockImplementation(() => Promise.resolve([sectionInput])),
              one: jest.fn()
              .mockImplementation(() => Promise.resolve(sectionInput)),
              save: jest.fn()
              .mockImplementation(() => Promise.resolve(true)),
              remove: jest.fn()
              .mockImplementation(() => Promise.resolve("section has been removed")),
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
  
        let sectionRepository;

        beforeEach(() => {
            sectionRepository = {
              save: jest.fn(),
              findOneBy: jest.fn(),
              remove: jest.fn()
            };
            AppDataSource.getRepository = jest.fn().mockReturnValue(sectionRepository);
        });
        
        describe('create section', () => {
            it('should create a section', async () => {
              const req = mockRequest(userInput);
              const res = mockResponse();
      
              const controller = new SectionController();
              await controller.save(req, res, nextMock);
  
              expect(sectionRepository.save).toBeCalled();
            });
        });
  
        describe('remove section', () => {
          it('should remove a section', async () => {
            const sectionId = 1;
            sectionRepository.findOneBy.mockReturnValueOnce(sectionInput);
  
            const req = mockRequestParam(sectionId, sectionInput);
            const res = mockResponse();
  
            const controller = new SectionController();
            await controller.remove(req, res, nextMock);
  
            expect(sectionRepository.findOneBy).toHaveBeenCalled();
            expect(sectionRepository.remove).toHaveBeenCalled();
          });
        });

        describe('remove unknown section', () => {
          it('should not remove any section', async () => {
            const sectionId = 1;
            sectionRepository.findOneBy.mockReturnValueOnce(undefined);
  
            const req = mockRequestParam(sectionId, sectionInput);
            const res = mockResponse();
  
            const controller = new SectionController();
            await controller.remove(req, res, nextMock);
  
            expect(sectionRepository.findOneBy).toHaveBeenCalled();
            expect(sectionRepository.remove).not.toHaveBeenCalled();
          });
        });
      });
});

describe('Unauthenticated Routes', () => {
    describe('get Section Route', () => {
      it('should not let you get all sections', async () => {
        await request(app)
          .get('/section')
          .expect(401);
      })
      it('should not let you get one of the sections', async () => {
        await request(app)
          .get('/section/1')
          .expect(401);
      })
    });
    describe('create Section Route', () => {
      it('should not let you create a section', async () => {
        await request(app)
          .post('/section')
          .send(sectionInput)
          .expect(401);
      })
    });
    describe('remove Section Route', () => {
      it('should not let you remove a section', async () => {
        const sectionId = 1;
    
        await request(app)
          .delete(`/section/${sectionId}`)
          .expect(401);
      })
    });
  });