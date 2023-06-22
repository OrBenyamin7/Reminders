require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reminderRoutes = require('./routes/tasks')
const userrRoutes = require('./routes/user')

//

const path = require("path");
const { fileURLToPath } = require("url");

const correntfilename = __filename
const correntdirname = path.dirname(correntfilename);

//express app
const app = express()

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
  express.static(
    path.join(correntdirname, "..", "..", "remindersfrontend", "dist", "assets")
  )
);
app.use(express.static(path.join(correntdirname, "..", "..", "remindersfrontend", "dist")));

app.get("/index-*.js", function (req, res) {
  res.type("application/javascript");
  res.sendFile(
    path.join(correntdirname, "..", "..", "remindersfrontend", "dist", "assets", req.path)
  );
});














//

//express app


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


    app.get("*", (req, res) => {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "remindersfrontend",
          "dist",
          "index.html"
        );
        console.log("File path:", filePath);
        res.sendFile(filePath);
      });
    