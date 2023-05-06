const {Router} = require('express')
const Flight = require ('../models/flight')

const router = Router()

router.get('/flights', (req, res) => {
    res.send("vamos vuelos")
}
)

module.exports = router