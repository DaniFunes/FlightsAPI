const mongoose = require('mongoose')

const airportSchema = new mongoose.Schema ({
    nombre: String,
    distancia_ciudad: Number,
    transportes: [{type : String, enum: ['Taxi', 'Tren', 'Metro', 'Autobús']}],
    servicios: [String],
})

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport