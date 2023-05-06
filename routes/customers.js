const { Router } = require("express");
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const router = Router();
const jwt = require("jsonwebtoken");

const privateKey = "escaner";

router.post("/customers/signup", async (req, res) => {
  const { email, contraseña: password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newCustomer = await Customer.create({
    email,
    contraseña: hash,
  });

  res.json(newCustomer);
});

router.post("/customers/signin", async (req, res) => {
  const { contraseña: password, email } = req.body;

  const customer = await Customer.findOne({ email });

  const isAuth = await bcrypt.compare(password, customer.contraseña);

  const token = jwt.sign(
    { nombre: customer.nombre, email: customer.email },
    privateKey
  );

  res.setHeader("x-auth-token", token);
  res.json("Success");
});

router.get("/customers", async (req, res) => {
  const clientes = await Customer.find({});
  res.json(clientes);
});

// router.post('/customers', async (req, res) => {
//     const customerDetails = req.body
// 	const newCustomer = await Customer.create(customerDetails)
// 	res.json(newCustomer)
// }
// )

module.exports = router;
