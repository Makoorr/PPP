import { AppDataSource } from "./data-source"
import createServer from "./server";

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        const app = createServer();

        // start express server
        app.listen(5000, () => {
            console.log("Listening on port 5000.");
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })