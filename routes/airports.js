const { Router } = require("express");
const Airport = require("../models/airport");
const jwt = require("jsonwebtoken");

const router = Router();

const privateKey = "escaner";


router.get('/airports', async (req, res) => {
    const aeropuertos = await Airport.find().exec()

    res.json(aeropuertos)
}
)

router.post("/airports", async (req, res) => {
  const aeropuertos = req.body;

  const token_jwt = req.headers['x-auth-token'];
  const decoded = jwt.verify(token_jwt, privateKey);

  if (decoded) {
    const newAirport = await Airport.create(aeropuertos);
    res.json(newAirport);
  } else {
    res.status(403).send("no eres usuario");
  }
});

module.exports = router;
