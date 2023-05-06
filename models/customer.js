const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema ({
    nombre: {type: String},
    apellidos: {type: String},
    contraseña: {type: String, required: true},
    email: {type: String, required: true},
    numero_pasaporte: {type: String},
    billetes: [{type: mongoose.Schema.Types.ObjectId,
		ref: 'Flight',}]
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
