import createServer from '../server';
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import { Request, Response, NextFunction } from 'express';
import * as supertest from 'supertest'

const app = createServer();

const userPayload = {
    login: 'jane.doe',
    password: 'password'
}

const userInput = {
    login: "jane.doe",
    password: "password",
    name: "Jane Doe",
  };

describe('User', () => {
    describe('register User', () => {
        describe('given Valid login and password', () => {
            describe('Authentication', () => {
                let token: string;
              
                it('should authenticate a user and return a token', async () => {
                    // Mock the findOne method to simulate no existing user
                    const findOneMock = jest
                    .spyOn(AppDataSource.manager, 'findOne')
                    .mockResolvedValueOnce(undefined);

                    // Mock the save method to simulate successful user creation
                    const saveMock = jest
                        .spyOn(AppDataSource.manager, 'save')
                        .mockResolvedValueOnce(userPayload);

                  const response = await supertest(app)
                    .post('/auth/register')
                    .send(userInput);
              
                  expect(response.status).toBe(200);
                  expect(response.body).toEqual({"message": "User created."});
                  expect(saveMock).toHaveBeenCalledWith(userInput);

                  token = response.body.token; // Store the token for future requests
                });
            })

        })
        
    })

})