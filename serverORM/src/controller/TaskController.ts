import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Task } from "../entity/Task"

export class TaskController {

    private taskRepository = AppDataSource.getRepository(Task)

    async all(request: Request, response: Response, next: NextFunction) {
        const tasks = await AppDataSource.manager
            .createQueryBuilder(Task, 'task')
            .leftJoinAndSelect('task.section', 'section')
            .leftJoinAndSelect('section.project', 'project')
            .leftJoinAndSelect('project.user', 'user')
            .select([
            'task.id',
            'task.name',
            'task.description',
            'task.priority',
            'task.deadline',
            'section.id',
            'section.name',
            'section.description',
            'project.id',
            'project.name',
            'project.description',
            'user.id',
            'user.name',
            ])
            .getMany();
        return tasks;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        
        const task = await AppDataSource.manager
            .createQueryBuilder(Task, 'task')
            .leftJoinAndSelect('task.section', 'section')
            .leftJoinAndSelect('section.project', 'project')
            .leftJoinAndSelect('project.user', 'user')
            .select([
            'task.id',
            'task.name',
            'task.description',
            'task.priority',
            'task.deadline',
            'section.id',
            'section.name',
            'section.description',
            'project.id',
            'project.name',
            'project.description',
            'user.id',
            'user.name',
            ])
            .where({id})
            .getMany();

        if (!task) {
            return "unregistered task"
        }
        return task
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description, priority, deadline } = request.body;

        const task = Object.assign(new Task(), {
            name,
            description,
            priority,
            deadline
        })

        return this.taskRepository.save(task)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const { name, description, priority, deadline } = request.body;

        try {
            const task = await this.taskRepository.findOneBy({ id });

            if (!task) {
                return "Task not found"
            }

            task.name = name || task.name;
            task.description = description || task.description;
            task.priority = priority || task.priority;
            task.deadline = deadline || task.deadline;

            await this.taskRepository.save(task);
            
            return "Task " + id + " has been updated. name: " + task.name + " | description: " + task.description + " | priority: " + task.priority + " | deadline: " + task.deadline 
        } catch (err) {
          return "Error: " + err.message
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let taskToRemove = await this.taskRepository.findOneBy({ id })

        if (!taskToRemove) {
            return "this task not exist"
        }

        await this.taskRepository.remove(taskToRemove)

        return "task has been removed"
    }

}