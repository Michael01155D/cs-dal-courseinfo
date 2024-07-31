const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const coursesRouter = require('./controllers/courses');
const reviewRouter = require('./controllers/reviews');
const userRouter = require('./controllers/user');
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const server = express();

server.use(express.json());
server.use("/courses", coursesRouter);
server.use("/reviews", reviewRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
    res.send("Hello");
})

server.listen(PORT, () => {
    console.log("Server connected on port:", PORT);
})

mongoose.connect(MONGO_URL).then(res => {
    console.log("Connected to MongoDB!");
}).catch(e => {console.log("Connection to MongoDB Failed, error:", e.message)})