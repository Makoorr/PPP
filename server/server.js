const express = require('express')
const app = express()

const usersRouter = require('./routers/user');
const tasksRouter = require('./routers/task');
const projectsRouter = require('./routers/project');
const sectionsRouter = require('./routers/section');

app.listen(5000, () => {
    console.log("Server started on port 5000")
});

app.use('/user', usersRouter);
app.use('/task', tasksRouter);
app.use('/project', projectsRouter);
app.use('/section', sectionsRouter);