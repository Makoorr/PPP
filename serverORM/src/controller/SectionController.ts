import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Section } from "../entity/Section"

export class SectionController {

    private projectRepository = AppDataSource.getRepository(Section)

    async all(request: Request, response: Response, next: NextFunction) {
        const sections = await AppDataSource.manager
            .createQueryBuilder(Section, 'section')
            .leftJoinAndSelect('section.project', 'project')
            .leftJoinAndSelect('project.user', 'user')
            .select([
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
        return sections;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const section = await AppDataSource.manager
        .createQueryBuilder(Section, 'section')
        .leftJoinAndSelect('section.project', 'project')
        .leftJoinAndSelect('project.user', 'user')
        .select([
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

        if (!section) {
            return "unregistered section"
        }
        return section
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description } = request.body;

        const section = Object.assign(new Section(), {
            name,
            description
        })

        return this.projectRepository.save(section)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let sectionToRemove = await this.projectRepository.findOneBy({ id })

        if (!sectionToRemove) {
            return "this section not exist"
        }

        await this.projectRepository.remove(sectionToRemove)

        return "section has been removed"
    }

}