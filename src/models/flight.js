const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  aeropuerto_origen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  aeropuerto_destino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  fecha_salida: { type: String, required: true },
  hora_salida: { type: String, required: true },
  plazas_totales: { type: Number, required: true },
  plazas_disponibles: { type: Number, required: true },
  precio: { type: Number, required: true},
  compania_aerea: String,
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
