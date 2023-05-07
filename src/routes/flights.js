const { Router } = require("express");
const Flight = require("../models/flight");
const mongoose = require("mongoose");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { filter } = require("lodash");
const router = Router();
const Customer = require("../models/customer");

// BUSCA LOS VUELOS QUE ESTÁN DISPONIBLES DESDE UN ORIGEN A UN DESTINO
router.get("/search/flights", async (req, res) => {
  try {
    const {
      aeropuerto_origen: aeropuertoOrigen,
      aeropuerto_destino: aeropuertoDestino,
    } = req.query;

    const billetes = await Flight.find()
      .populate({ path: "aeropuerto_origen", select: "nombre" })
      .populate({ path: "aeropuerto_destino", select: "nombre" });

    const billeteFiltrado = billetes.filter(
      (billete) =>
        billete.aeropuerto_origen.nombre === aeropuertoOrigen &&
        billete.aeropuerto_destino.nombre === aeropuertoDestino &&
        billete.plazas_disponibles > 0 &&
        billete.fecha_salida >= new Date()
    );

    res.json(billeteFiltrado);
  } catch (err) {
    console.log(err);
  }
});

//UN CLIENTE COMPRA UN VUELO
router.put("/shop/flights/:idBillete/:customerId", isAuth, async (req, res) => {
  try {
    const idBillete = req.params.idBillete;
    const idCustomer = req.params.customerId;
    const { plazas_disponibles } = await Flight.findById(idBillete);

    if (!plazas_disponibles)
      return res.status(401).send("No quedan plazas en este vuelo");

    const billeteSel = await Flight.findByIdAndUpdate(
      idBillete,
      {
        $inc: { plazas_disponibles: -1 },
      },
      { new: true }
    );

    const customerUpdated = await Customer.findByIdAndUpdate(
      idCustomer,
      { $push: { billetes: idBillete } },
      { new: true }
    );

    res.json(customerUpdated);
  } catch (err) {
    console.log(err);
  }
});

//AÑADE VUELOS SI ERES USUARIO ADMINISTRADOR
router.post("/add/flights", isAuth, isAdmin, async (req, res) => {
  try {
    const flightDetails = req.body;
    const newAirport = await Flight.create(flightDetails);
    res.json(newAirport);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// ACTUALIZA LA INFORMACIÓN DE UN VUELO
router.put("/flights/:flightId", isAuth, isAdmin, async (req, res) => {
  try {
    const flightId = req.params.flightId;
    const flightDetails = req.body;
    const updatedFlight = await Flight.findByIdAndUpdate(
      flightId,
      flightDetails,
      { new: true }
    );
    res.json(updatedFlight);
  } catch (err) {
    console.log(err);
  }
});
