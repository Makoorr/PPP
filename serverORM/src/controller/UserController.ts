import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await AppDataSource.manager.find(User, {
            relations: ['projects', 'projects.sections', 'projects.sections.tasks'],
            select: ['id', 'login', 'name', 'projects']
          });
        return users;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        const user = await AppDataSource.manager.find(User, {
            where: {id},
            relations: ['projects', 'projects.sections', 'projects.sections.tasks'],
            select: ['id', 'login', 'name', 'projects']
        });

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { login, password, name } = request.body;
        console.log("New user created: ", request.body)

        const user = Object.assign(new User(), {
            login,
            password,
            name
        })

        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { login, password, name } = request.body;

        try {
            const user = await this.userRepository.findOneBy({ id });

            if (!user) {
                return "User not found"
            }

            user.login = login || user.login;
            user.password = password || user.password;
            user.name = name || user.name;

            await this.userRepository.save(user);
            
            return "User " + id + " has been updated. login: " + user.login + " | name: " + user.name + " | password: " + user.password
        } catch (err) {
          return "Error: " + err.message
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "User "+ id +" has been removed"
    }

}