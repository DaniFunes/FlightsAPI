const morgan = require("morgan");
const {json} = require("express");

const customers= require("../routes/customers.js") 
const flights = require("../routes/flights.js") 
const airports = require("../routes/airports.js") 

module.exports = function (app) {
  const apiPath = "/api/flightscanner";

  app.use(morgan("dev"));
  app.use(json());

  app.use(apiPath, customers);
  app.use(apiPath, flights);
  app.use(apiPath, airports);
};


// app.get("/ping", (req, res) => {
//   res.json("pong");
// });
