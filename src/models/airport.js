const mongoose = require('mongoose')

const airportSchema = new mongoose.Schema ({
    nombre: {type:String , required:true, unique: true},
    distancia_ciudad: Number,
    transportes: [{type : String, enum: ['Taxi', 'Tren', 'Metro', 'Autobús']}],
    servicios: [String],
})

const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport