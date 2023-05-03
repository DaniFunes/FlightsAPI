import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema ({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    contraseña: {type: String, required: true},
    email: {type: String, required: true},
    numero_pasaporte: {type: String, required: true},
    vuelos_reservados: [{type: mongoose.Schema.Types.ObjectId,
		ref: 'Flight',
		required: true}],
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;