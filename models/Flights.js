import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema ({
    origen: {type: String, required: true},
    destino: {type: String, required: true},
    fecha_salida: {type: String, required: true},
    hora_salida: {type: String, required: true},
    plazas_totales: {type: Number, required: true},
    plazas_disponibles: {type: Number, required: true},
    precio: {type: Number},
    compania_aerea: String,
    aeropuerto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Airport',
		required: true,
	},
    timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;