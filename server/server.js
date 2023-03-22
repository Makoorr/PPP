const express = require('express')
const app = express()

app.listen(5000, () => {
    console.log("Server started on port 5000")
});

app.get("/api",(req, res) => {
    res.json({ "users": ["user1", "user2"] })
});