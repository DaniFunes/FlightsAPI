const jwt = require("jsonwebtoken");

module.exports = function isAuth(req, res, next) {
    const token_jwt = req.headers['x-auth-token'];
  
    if (!token_jwt) return res .status(401).send("no hay token de acceso");
  
    try {
      const decoded = jwt.verify(token_jwt, process.env["jwt_privateKey"]);
      req.customer = decoded;
    } catch (err) {
      
      res.status(401).send("Token invalido")
    }
  
    next();
  }