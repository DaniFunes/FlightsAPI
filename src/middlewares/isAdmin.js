module.exports = function (req, res, next) {
  if (!req.customer.isAdmin) return res.status(403).send("Área protegida");

  next()
};
