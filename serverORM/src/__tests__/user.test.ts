import createServer from '../server';
import { AppDataSource } from '../data-source'
import * as supertest from 'supertest'

const app = createServer();

const userPayload = { // user payload to check with
    login: 'jane.doe',
    password: 'password'
}

const userInput = { // valid user
    login: "jane.doe",
    password: "password",
    name: "Jane Doe",
  };

const wrongPasswordInput = { // wrong password
    login: "jane.doe",
    password: "wrongpassword",
};

const wrongLoginInput = { // wrong login
    login: "janedoe",
    password: "password",
};

afterEach(() => { // clear mocks after each test
  jest.clearAllMocks();
});

describe('User', () => {
    describe('register User', () => {
        describe('given Valid login and password', () => {        
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
          });
        })

        describe('given existing user login', () => {
          it('should return 401', async () => {
              // Mock the findOne method to simulate an existing user
              const findOneMock = jest
              .spyOn(AppDataSource.manager, 'findOne')
              .mockResolvedValueOnce(userInput);

              const response = await supertest(app)
              .post('/auth/register')
              .send(userInput);

              expect(response.status).toBe(401);
              expect(response.text).toBe("User already exists.");
          })
        });
    })

    describe('login User', () => {
      let token: string;

      describe('given valid login and password', () => {
        it('should authenticate a user and return a token', async () => {
            // Mock the findOne method to simulate an existing user
            const findOneMock = jest
            .spyOn(AppDataSource.manager, 'findOne')
            .mockResolvedValueOnce(userInput);

            const response = await supertest(app)
            .post('/auth')
            .send(userInput);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            token = response.body.token;
            console.log(token);
        })
      });

      describe('given invalid login', () => {
        it('should return 401', async () => {
            // Mock the findOne method to simulate no existing user
            const findOneMock = jest
            .spyOn(AppDataSource.manager, 'findOne')
            .mockResolvedValueOnce(undefined);

            const response = await supertest(app)
            .post('/auth')
            .send(wrongLoginInput);

            expect(response.status).toBe(401);
            expect(response.text).toBe("User not Found.");
        })
      });

      describe('given invalid password', () => {
        it('should return 401', async () => {
            // Mock the findOne method to simulate no existing user
            const findOneMock = jest
            .spyOn(AppDataSource.manager, 'findOne')
            .mockResolvedValueOnce(userPayload);

            const response = await supertest(app)
            .post('/auth')
            .send(wrongPasswordInput);

            expect(response.status).toBe(401);
            expect(response.text).toBe("Unauthorized");
        })
      });
    });


})