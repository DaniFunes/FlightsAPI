const {Router} = require('express')
const Airport = require ('../models/airport')

const router = Router()

router.get('/airports', async (req, res) => {
    const aeropuertos = await Airport.find().exec()
    
    res.json(aeropuertos)
}
)

router.post('/airports', async (req, res) => {
    const aeropuertos = req.body;
    const newAirport = await Airport.create(aeropuertos)
     res.json(newAirport)


} )

module.exports = router