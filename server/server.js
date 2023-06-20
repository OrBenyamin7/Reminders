//import path from "path";
import { fileURLToPath } from "url";
require('dotenv').config()

//



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const path = require("path");

const PORT = process.env.PORT || 4000;
dotenv.config();
// dotenv.config({ path: path.join(__dirname, ".env") });
//dotenv.config({ path: '../server/.env' });


app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "*");
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use((req, res, next) => {
  if (!req.url.endsWith(".js") && !req.url.endsWith(".css")) {
    res.type("text/html");
  }
  next();
});
app.use((req, res, next) => {
  if (req.url.endsWith(".js")) {
    res.type("text/javascript");
  }
  next();
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "..", "remindersfrontend", "dist", "assets"))
);
app.use(express.static(path.join(__dirname, "..", "remindersfrontend", "dist")));



app.get("/index-*.js", function (req, res) {
  res.type("application/javascript");
  res.sendFile(
    path.join(__dirname, "..", "remindersfrontend", "src", "assets", req.path)
  );
});



//






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
    
