const { Router } = require("express");
const Airport = require("../models/airport");
const mongoose = require("mongoose");
const isAuth = require("../middlewares/isAuth");
const router = Router();
const isAdmin = require("../middlewares/isAdmin");

router.get("/airports", isAuth, isAdmin , async (req, res) => {
  try {
    const aeropuertos = await Airport.find().exec();
    res.json(aeropuertos);

  } 
  catch {}

  res.json(aeropuertos);
});

router.post("/airports", isAuth, isAdmin, async (req, res) => {
  const aeropuertos = req.body;
  const newAirport = await Airport.create(aeropuertos);
  res.json(newAirport);
});

module.exports = router;
