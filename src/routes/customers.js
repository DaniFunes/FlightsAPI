const { Router } = require("express");
const router = Router();
const Customer = require("../models/customer");
const isAuth = require("../middlewares/isAuth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const Flight = require("../models/flight");
const Airport = require("../models/airport");

// VER VUELOS RESERVADOS DE UN CLIENTE
router.get("/customers/:customerId", isAuth, async (req, res) => {
  const customerId = req.params.customerId;
  const customerFlights = await Customer.findById(customerId)
    .populate({
      path: "billetes",
      populate: { path: "aeropuerto_origen", model: "Airport" },
    })
    .populate({
      path: "billetes",
      populate: { path: "aeropuerto_destino", model: "Airport" },
    })
    .select("billetes");

  res.json(customerFlights);
});

// REGISTRA A UN CLIENTE
router.post("/customers/signup", async (req, res) => {
  const { contraseña: passwordPlainText, ...rest } = req.body;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(passwordPlainText, salt);

  const newCustomer = await Customer.create({
    password,
    ...rest,
  });

  const token = newCustomer.generateJWT();

  res.setHeader("x-auth-token", token);
  res.json(newCustomer);
});

// LOGUEA A UN CLIENTE
router.post("/customers/signin", async (req, res) => {
  const { contraseña: password, email } = req.body;

  const customer = await Customer.findOne({ email });

  const isUser = await bcrypt.compare(password, customer.password);

  const token = customer.generateJWT();

  res.setHeader("x-auth-token", token);
  res.json("Success");
});

// DEVUELVE TODOS LOS CLIENTES
router.get("/customers", async (req, res) => {
  const clientes = await Customer.find({});
  res.json(clientes);
});

//ACTUALIZA UN USUARIO CON NOMBRE, APELLIDOS O PASAPORTE

router.put("/customers/:customerId", isAuth, async (req, res) => {
  const customerId = req.params.customerId;
  const infoToUpdate = req.body;
  const customerUpdated = await Customer.findByIdAndUpdate(
    customerId,
    infoToUpdate,
    { new: true }
  );

  res.json(customerUpdated);
});

// CLIENTE BORRA SU CUENTA DE USUARIO

router.delete("/customers/:customerId", isAuth, async (req, res) => {
  const customerId = req.params.customerId;
  const customerDeleted = await Customer.findByIdAndDelete(customerId);

  res.json(customerDeleted);
});

// CLIENTE ACTUALIZA LA CONTRASEÑA

router.put("/customers/:customerId", isAuth, async (req, res) => {
  const { contraseña: udpatedPassword } = req.body;
  const customerId = req.params.customerId;
  console.log(customerId);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(udpatedPassword, salt);

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    password,
    { new: true }
  );

  const token = updatedCustomer.generateJWT();

  res.setHeader("x-auth-token", token);
  res.json(updatedCustomer);
});

module.exports = router;
