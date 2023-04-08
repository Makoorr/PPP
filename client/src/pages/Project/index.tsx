import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Navbar from '../../components/Navbar';
import AddButton from '../../components/AddButton';
import SideNavbar from '../../components/SideNavbar';
import ContentNavbar from '../../components/ContentNavbar';
import Task from '../../components/Task';
import jwt_decode from "jwt-decode";
import { Link, useParams } from 'react-router-dom';

interface ProjectProps {}

interface User {
    id: number;
    login: string;
    name: string;
    projects: Project[];
}

interface Project {
    id: number;
    name: string;
    description: string;
    done: boolean;
    sections: Section[];
}

interface Section {
    id: number;
    name: string;
    description: string;
    done: boolean;
    tasks: any[];
}

interface Payload {
    id: number;
    username : string;
}

export default function Project({}: ProjectProps) {
    const [user, setUser] = useState<User>();
    const [project, setProject] = useState<Project>();
    const [sections, setSections] = useState<Section[]>();

    // Get user id and token from local storage
    const token = localStorage.getItem('token') as string;
    // decode the token to get the payload
    const payload = jwt_decode(token) as Payload;

    // access data from the payload
    const userId = payload.id;
    const projectParamId = useParams<{ projectParamId: string }>() as string;

    // Set User and Project and its sections
    useEffect(() => {
        const fetchUser = async () => {
            const {data: user} = await axios.get<User[]>('http://localhost:5000/user/'+userId, {headers: { Authorization: `Bearer ${token}` }});
            setUser(user[0]);

            // Match projectParamId with project id
            let projectId = user[0]?.projects?.map(
                (project) => project.id).indexOf(parseInt(projectParamId["projectId" as keyof typeof Project])
                );
            projectId === -1 ? projectId = 0 : projectId = projectId;
            setProject(user[0].projects[projectId])
            setSections(user[0].projects[projectId].sections)
        };
        fetchUser();
    }, [userId]);

    return (
        <>
            <Navbar background="True" />

            <SideNavbar>
            { user?.projects ? (
                <div key={user.id}>
                    {user.projects.map((project) => (
                        <a key={project.id} href={`/sections/${project.id}`}>{project.name}</a>
                    ))}
                </div>
                ) : (
                <div>
                    <ul>No project found</ul>
                </div>
            )}
            </SideNavbar>

            <ContentNavbar
            header= {
                <h3 color="#000" style={{ margin: 0, fontSize: "1.3rem" }}>{
                    project ? ( <>
                       <span style={{ marginRight: "0.5em" }}>{project?.name}</span>
                    </>
                    ) : "Project not found!"
                }</h3>
            }>
                <div>
                    <AddButton svg={<img src="https://img.icons8.com/ios-glyphs/30/null/plus-math.png"/>}>
                        Add Section
                    </AddButton>
                    <div>
                    { (sections) ? (
                        sections.map((section) => (
                            <div key={section.id}>
                                <Link  to={`/tasks/${project?.id}/${section.id}`}>
                                    <Task
                                        name= {section.name}
                                        description= {section.description}
                                    />
                                </Link>
                            </div>
                        ))
                        ) : (
                        <div>
                            <h2 style={{ margin: "0.5em" }}>No sections found.</h2>
                        </div>
                    )}
                    </div>
                </div>
            </ContentNavbar>
        </>
    );
};