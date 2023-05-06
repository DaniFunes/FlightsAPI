const { Router } = require("express");
const router = Router();
const Customer = require("../models/customer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const { pick } = require("lodash");

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

// LOGEA A UN CLIENTE
router.post("/customers/signin", async (req, res) => {
  const { contraseña: password, email } = req.body;

  const customer = await Customer.findOne({ email });

  const isUser = await bcrypt.compare(password, customer.contraseña);

  const token = customer.generateJWT();

  res.setHeader("x-auth-token", token);
  res.json("Success");
});

// DEVUELVE TODOS LOS CLIENTES
router.get("/customers", async (req, res) => {
  const clientes = await Customer.find({});
  res.json(clientes);
});

module.exports = router;
