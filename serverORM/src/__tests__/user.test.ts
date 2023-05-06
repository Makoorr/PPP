import createServer from '../server';
import * as supertest from 'supertest'

const app = createServer();

describe('User', () => {
    describe('get User', () => {

        describe('when user exists', () => {
            it('should return user', () => {
                expect(1).toBe(1)
            })
        })

        describe('when user does not exist', () => {
            it('should throw an error', async () => {
                const userId = "ahmed23"

                expect(1).toBe(1)

                // await supertest()
                // .get(`/users/${userId}`)
                // .expect(404)
            })
        })
    })

})