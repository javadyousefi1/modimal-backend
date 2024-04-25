function notFound(req, res, next) {
  return res.status(404).json({
    statusCode: res.statusCode,
    message: "route not found",
  });
}

function errorHandler(err, req, res, next) {
  return res.json({
    statusCode: err.status || 500,
    message: err.message || "server internal error",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
