const express = require('express')
const app = express()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const tasksRouter = require('./routes/task');

app.listen(5000, () => {
    console.log("Server started on port 5000")
});

app.use("/",indexRouter);
app.use('/user', usersRouter);
app.use('/task', tasksRouter);
app.use('/project', usersRouter);
app.use('/section', tasksRouter);