// import { UserController } from '../controller/UserController';
import createServer from '../server';
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { Request, Response, NextFunction } from 'express';
import * as supertest from 'supertest'
const request = require('supertest')

const app = createServer();

const userPayload = {
    login: 'test',
    password: 'testpassword'
}

const userInput = {
    login: "Jane Doe",
    password: "password",
    name: "jane.doe",
  };


describe('User', () => {
    describe('register User', () => {
        describe('given Valid login and password', () => {
            // let user = AppDataSource.getRepository(User);
            
            // it('should return a signed token', async () => {
            //     const createUserServiceMock = jest.spyOn(user, 'save')
            //     // @ts-ignore
            //     .mockResolvedValueOnce(userPayload)

            //     const { statusCode, body } = await supertest(app)
            //     .post("/auth/register")
            //     .send(userInput);

            //     expect(statusCode).toBe(200);
            //     // expect(body).toEqual(userPayload);
            //     // expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            // })

            describe('Authentication', () => {
                let token: string;
              
                it('should authenticate a user and return a token', async () => {
                  const response = await request(app)
                    .post('/auth/register') // Assuming you have a login route in your app
                    .send(userInput);
              
                  expect(response.status).toBe(200);
                  expect(response.body).toEqual("User created.");
              
                  token = response.body.token; // Store the token for future requests
                });
            })

        })
        
    })

})