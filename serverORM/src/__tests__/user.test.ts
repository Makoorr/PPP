import createServer from '../server';
import { AppDataSource } from '../data-source'
import { Any, DataSource } from "typeorm";
import * as supertest from 'supertest'
import { UserController } from '../controller/UserController';
import { User } from '../entity/User';

const app = createServer();


// Creating variables for future use cases
  const userPayload = { // user payload to check with
      login: 'jane.doe',
      password: 'password'
  }

  const userInput = { // valid user
      login: "jane.doe",
      password: "password",
      name: "Jane Doe",
  };

  const userInputs = [ // valid users
    userInput,
    { login: "jane.doe", password: "password", name: "Jane Doe" },
    { login: "john.doe", password: "password", name: "John Doe" },
  ];

  const wrongPasswordInput = { // wrong password
      login: "jane.doe",
      password: "wrongpassword",
  };

  const wrongLoginInput = { // wrong login
      login: "janedoe",
      password: "password",
  };

  let token: string; // token to be used in tests

afterEach(() => { // clear mocks after each test
  jest.clearAllMocks();
});

describe('Register User', () => {
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

describe('Login User', () => {
  

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
  });

  describe('User Routes', () => {
    // Setting up Mock constants to use in our context
    const findMock = jest
    .spyOn(AppDataSource.manager, 'find');

    const findOneMock = jest
    .spyOn(AppDataSource.manager, 'find');

    const mockNext = jest.fn();

    beforeAll(async () => {
      findMock.mockImplementation(() => Promise.resolve(userInputs));
      findOneMock.mockImplementation(() => Promise.resolve([userInput]));
    });

    let id = 1;

    describe('given valid token', () => {
      describe('get all users', () => {
        it('should return users', async () => {
          const response = await supertest(app)
          .get('/user')
          .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toContainEqual(userInput);
            expect(findMock).toHaveBeenCalled();
        });
      });

      describe('get user by id', () => {
        it('should return one user by id', async () => {
          // Mock Response by id
          const response = await supertest(app)
          .get(`/user/${id}`)
          .set('Authorization', `Bearer ${token}`);

          expect(response.status).toBe(200);
          expect(response.body).toContainEqual(userInput);
          expect(findOneMock).toHaveBeenCalled();
        });
      });
      
      describe("save user", () => {
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
          let userRepository;
      
          beforeEach(() => {
              userRepository = { save: jest.fn() };
              AppDataSource.getRepository = jest.fn().mockReturnValue(userRepository);
          });
      
          test("should call userRepository.save with correct arguments", async () => {
              const req = mockRequest(userInput);
              const res = mockResponse();
      
              const controller = new UserController();
              await controller.save(req, res, mockNext);

              expect(userRepository.save).toHaveBeenCalledWith(userInput);
          });
      });

      describe("update user", () => {
        const mockRequest = (params, body) => {
          return {
              params,
              body
          };
        };
        
        const mockResponse = () => {
            let res = {"status": undefined, "json": undefined};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };
        let userRepository;
      
        beforeEach(() => {
            userRepository = { 
                save: jest.fn(),
                findOneBy: jest.fn()
            };
            AppDataSource.getRepository = jest.fn().mockReturnValue(userRepository);
        });
    
        test("should update the user and return a success message", async () => {
            const req = mockRequest({ id: "1" }, { login: "newUser", password: "newPassword", name: "newName" });
            const res = mockResponse();
    
            const user = { id: 1, login: "oldUser", password: "oldPassword", name: "oldName" };
            userRepository.findOneBy.mockResolvedValue(user);
    
            const controller = new UserController();
            const result = await controller.update(req, res, mockNext);
    
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(userRepository.save).toHaveBeenCalledWith({
                id: 1,
                login: "newUser",
                password: "newPassword",
                name: "newName"
            });
            expect(result).toBe("User 1 has been updated. login: newUser | name: newName | password: newPassword");
        });
    
        test("should return 'User not found' if the user does not exist", async () => {
            const req = mockRequest({ id: "1" }, {});
            const res = mockResponse();
    
            userRepository.findOneBy.mockResolvedValue(undefined);
    
            const controller = new UserController();
            const result = await controller.update(req, res, mockNext);
    
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(result).toBe("User not found");
        });
    
        test("should return 'Error: message' when an error is thrown", async () => {
            const req = mockRequest({ id: "1" }, {});
            const res = mockResponse();
    
            userRepository.findOneBy.mockRejectedValue(new Error('Test error'));
    
            const controller = new UserController();
            const result = await controller.update(req, res, mockNext);
    
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(result).toBe("Error: Test error");
        });
      });
   
      describe("remove user", () => {
        const mockRequest = (params, body) => {
          return {
              params,
              body
            };
        };

        const mockResponse = () => {
            let res = {"status": undefined, "json": undefined};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        };

        let userRepository;
    
        beforeEach(() => {
            userRepository = { 
                remove: jest.fn(),
                findOneBy: jest.fn()
            };
            AppDataSource.getRepository = jest.fn().mockReturnValue(userRepository);
        });
    
        test("should remove the user and return a success message", async () => {
            const req = mockRequest({ id: "1" }, {});
            const res = mockResponse();
    
            const user = { id: 1, userInput };
            userRepository.findOneBy.mockResolvedValue(user);
    
            const controller = new UserController();
            const result = await controller.remove(req, res, mockNext);
    
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(userRepository.remove).toHaveBeenCalledWith(user);
            expect(result).toBe("User 1 has been removed");
        });
    
        test("should return 'this user not exist' if the user does not exist", async () => {
            const req = mockRequest({ id: "1" }, {});
            const res = mockResponse();
    
            userRepository.findOneBy.mockResolvedValue(undefined);
    
            const controller = new UserController();
            const result = await controller.remove(req, res, mockNext);
    
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
            expect(result).toBe("this user not exist");
        });
      });
    });

    describe('given invalid token', () => {
      it('should return 401', async () => {
        const response = await supertest(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}1`);

        expect(response.status).toBe(401);
        expect(response.text).toBe("Unauthorized");
        expect(findMock).not.toHaveBeenCalled();
      })
    });
  });
});