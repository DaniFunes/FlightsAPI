const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")

const customers= require("./routes/customers.js") 
const flights = require("./routes/flights.js") 
const airports = require("./routes/airports.js") 

mongoose.connect("mongodb://127.0.0.1:27017/flightscanner")
  .then(() => console.log("me he conectado"))
  .catch((err) => console.log("no me he conectado" + err));


const apiPath = "/api/flightscanner";

const port = process.env.PORT || 3001;
const app = express();

app.use(morgan("dev"));
app.use(express.json())

app.use(apiPath, customers);
app.use(apiPath, flights);
app.use(apiPath, airports);

// app.get("/ping", (req, res) => {
//   res.json("pong");
// });

// const db = 'FlightScaner';
// const url = 'mongodb://localhost:27017'

// main().catch(console.err);
// const main = async () => await mongoose.connect(url + db)

app.listen(port, () => console.log("server on " + port));
