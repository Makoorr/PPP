import { UserController } from "./controller/UserController"
import { ProjectController } from "./controller/ProjectController"
import { SectionController } from "./controller/SectionController"
import { TaskController } from "./controller/TaskController"

export const Routes = [
{
    method: "get",
    route: "/user",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove"
},

{
    method: "get",
    route: "/project",
    controller: ProjectController,
    action: "all"
}, {
    method: "get",
    route: "/project/:id",
    controller: ProjectController,
    action: "one"
}, {
    method: "post",
    route: "/project",
    controller: ProjectController,
    action: "save"
}, {
    method: "delete",
    route: "/project/:id",
    controller: ProjectController,
    action: "remove"
},

{
    method: "get",
    route: "/section",
    controller: SectionController,
    action: "all"
}, {
    method: "get",
    route: "/section/:id",
    controller: SectionController,
    action: "one"
}, {
    method: "post",
    route: "/section",
    controller: SectionController,
    action: "save"
}, {
    method: "delete",
    route: "/section/:id",
    controller: SectionController,
    action: "remove"
},

{
    method: "get",
    route: "/task",
    controller: TaskController,
    action: "all"
}, {
    method: "get",
    route: "/task/:id",
    controller: TaskController,
    action: "one"
}, {
    method: "post",
    route: "/task",
    controller: TaskController,
    action: "save"
}, {
    method: "delete",
    route: "/task/:id",
    controller: TaskController,
    action: "remove"
}]