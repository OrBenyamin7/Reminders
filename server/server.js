require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reminderRoutes = require('./routes/tasks')
const userrRoutes = require('./routes/user')

//express app
const app = express()


//middleware
app.use(express.json())

//
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//it like writing router.get('/',() => {}) - it will execute what we have in the bracilate
app.use('/api/tasks',reminderRoutes)
app.use('/api/user',userrRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })
    
