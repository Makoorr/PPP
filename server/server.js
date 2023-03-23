const express = require('express')
const app = express()

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routers/users.js")(app);
app.listen(5000, () => {
    console.log("Server started on port 5000")
});