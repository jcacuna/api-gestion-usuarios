const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Error de validación",
      detalles: err.details || err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID inválido" });
  }

  res.status(err.status || 500).json({
    error: err.message || "Error en el servidor",
  });
};

export default errorHandler;
