import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema ({
    siglas: {type: String, required: true},
    distancia_ciudad: Number,
    transportes: [{type : String,
    enum: ['Taxi', 'Tren', 'Metro', 'Autobús']}],
    servicios: [String],
    vuelos_semana: [{type: mongoose.Schema.Types.ObjectId , ref: 'Flight'}],
    timestamps: true
})

const Airport = mongoose.model('Airport', airportSchema);

export default Airport;
