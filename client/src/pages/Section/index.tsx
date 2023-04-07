import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AddButton from '../../components/AddButton';
import SideNavbar from '../../components/SideNavbar';
import ContentNavbar from '../../components/ContentNavbar';
import Task from '../../components/Task';

interface SectionProps {}

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
   tasks: Task[];
}

interface Task {
   id: number;
   name: string;
   description: string;
   done: boolean;
}

export default function Section({}: SectionProps) {
   const [user, setUser] = useState<User>();
   const [project, setProject] = useState<Project>();
   const [section, setSection] = useState<Section>();
   const [tasks, setTask] = useState<Task[]>();
   const userId = 3;
   const ParamId = useParams<{ ParamId: string }>() as string;

   // Set User and Project and its sections
   useEffect(() => {
      const fetchUser = async () => {
          const {data: user} = await axios.get<User[]>('http://localhost:5000/user/'+userId);
          setUser(user[0]);

          // Match ParamId with project id
          const projectId = user[0].projects.map(
              (project) => project.id).indexOf(parseInt(ParamId["projectId" as keyof typeof Section])
              );
          // Match sectionParamId with section id
          const sectionId = user[0].projects[projectId].sections.map(
              (section) => section.id).indexOf(parseInt(ParamId["sectionId" as keyof typeof Section])
              );
          console.log(user[0])
          
         setProject(user[0].projects[projectId])
         setSection(user[0].projects[projectId].sections[sectionId])
         setTask(user[0].projects[projectId].sections[sectionId].tasks)
      };
      fetchUser();
  }, [userId]);
   
   return (
      <div>
         <Navbar background="True">
            <li>
            <a href="/">Home</a>
            </li>
         </Navbar>

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
                  section && project ? ( <>
                     <Link to={`/sections/${project.id}`}><span style={{ marginRight: "0.5em" }}>{project?.name}</span></Link>
                     /
                     <span style={{ marginLeft: "0.5em" }}>{section?.name}</span>
                  </>
                  ) : "Project not found!"
              }</h3>
         }>
            <div>
               <AddButton svg={<img src="https://img.icons8.com/ios-glyphs/30/null/plus-math.png"/>}>
                  Add Task
               </AddButton>
               <div>
                  { tasks?.length ? (
                     tasks.map((task) => (
                           <Task key={task.id}
                              name= {task.name}
                              description= {task.description}
                           />
                     ))
                  ) : (
                     <div>
                        <h2 style={{ margin: "1em" }}>No Tasks found.</h2>
                    </div>
                  )}
                  </div>
            </div>
         </ContentNavbar>
      </div>
   );
}