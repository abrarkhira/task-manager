const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routes/User.routes');
const taskRouter = require('./src/routes/Tasks.routes');
const cors = require('cors');
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('Connected to DB')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use('/task', taskRouter)


const port = process.env.TMSPORT
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

