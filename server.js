const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/db')

//Database Connection
connectDB()
//rest obj
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/v1/user', require("./routes/userRoutes"))
//port
const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on ${port} on ${process.env.DEV_MODE} mode`.bgCyan.white
    )
})