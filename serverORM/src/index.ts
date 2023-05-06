import createServer from "./server"
import { AppDataSource } from "./data-source"
import * as express from 'express'


AppDataSource.initialize().then(async (connection) => {
    const app: express = createServer(AppDataSource, connection);

    await connection.synchronize();
    await connection.runMigrations();

    // start express server
    app.listen(5000, () => {
        console.log("Listening on port 5000.")
    })
}).catch(error => console.log(error));