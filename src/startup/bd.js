const mongoose = require("mongoose")

module.exports = () => {mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("me he conectado a la base de datos"))
.catch((err) => console.log("no me he conectado a la base de datos" + err));;}
