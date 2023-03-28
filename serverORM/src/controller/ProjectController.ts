import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Project } from "../entity/Project"

export class ProjectController {

    private projectRepository = AppDataSource.getRepository(Project)

    async all(request: Request, response: Response, next: NextFunction) {
        const projects = await AppDataSource.manager
            .createQueryBuilder(Project, 'project')
            .leftJoinAndSelect('project.user', 'user')
            .select(['project.id', 'project.name', 'project.description', 'user.id', 'user.name'])
            .getMany();
        return projects;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const project = await AppDataSource.manager
            .createQueryBuilder(Project, 'project')
            .leftJoinAndSelect('project.user', 'user')
            .select(['project.id', 'project.name', 'project.description', 'user.id', 'user.name'])
            .where({id})
            .getMany();

        if (!project) {
            return "unregistered project"
        }
        return project
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description } = request.body;

        const project = Object.assign(new Project(), {
            name,
            description
        })

        return this.projectRepository.save(project)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let projectToRemove = await this.projectRepository.findOneBy({ id })

        if (!projectToRemove) {
            return "this project not exist"
        }

        await this.projectRepository.remove(projectToRemove)

        return "project has been removed"
    }

}