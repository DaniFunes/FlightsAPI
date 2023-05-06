const express = require("express")
require('dotenv').config()

const app = express();

require('./src/startup/bd')()
require('./src/startup/routes')(app)
require('dotenv').config() 

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("server on " + port));
