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
    
    // const saveMock = jest
    // .spyOn(userRepositoryMock, 'save');

    // const deleteMock = jest
    // .spyOn(userRepositoryMock, 'remove');

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

      // describe('post user', () => {
      //   it('should create a user', async () => {
      //     const response = await supertest(app)
      //     .post('/user')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send(userInput);

      //     expect(response.status).toBe(200);
      //     expect(userRepositoryMock).toHaveBeenCalled();
      //     expect(userRepositoryMock).toHaveBeenCalledWith(expect.objectContaining({userInput}));
      //   });
      // });

      // describe('update user', () => {
      //   it('should update a user', async () => {
      //     const response = await supertest(app)
      //     .put(`/user/${id}`)
      //     .set('Authorization', `Bearer ${token}`)
      //     .send(userInput);

      //     expect(response.status).toBe(200);
      //     expect(saveMock).toHaveBeenCalledTimes(1);
      //     expect(saveMock).toHaveBeenCalledWith(
      //       expect.objectContaining(userInput));
      //   });
      // });

      // describe('delete user', () => {
      //   it('should delete a user', async () => {
      //     const response = await supertest(app)
      //     .delete(`/user/${id}`)
      //     .set('Authorization', `Bearer ${token}`);

      //     expect(response.status).toBe(200);
      //     expect(response.body).toEqual({"message": "User deleted."});
      //     expect(deleteMock).toHaveBeenCalled();
      //   });
      // });

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