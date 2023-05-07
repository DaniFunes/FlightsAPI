const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");

const customerSchema = new mongoose.Schema({
  nombre: { type: String },
  apellidos: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  numero_pasaporte: { type: String },
  isAdmin: Boolean,
  billetes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Flight" }],
});

customerSchema.methods.generateJWT = function () {
  return jwt.sign(
    pick(this, ["nombre", "email", "isAdmin"]),
    process.env["jwt_privateKey"]
  );
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
