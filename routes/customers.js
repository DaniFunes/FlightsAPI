const {Router} = require('express')
const Customer = require ('../models/customer')

const router = Router()

router.get('/customers', async (req, res) => {
    const clientes = await Customer.find({})
    res.json(clientes)
}
)

router.post('/customers', async (req, res) => {
    const customerDetails = req.body
	const newCustomer = await Customer.create(customerDetails)
	res.json(newCustomer)
}
)

module.exports = router