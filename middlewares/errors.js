module.exports = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  // do something with the error
  next(res.status(statusCode).json({ message }));
};
