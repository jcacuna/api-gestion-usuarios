import { usuarioSchema } from "../schemas/usuarioSchema.js";

export const validarUsuario = (req, res, next) => {
  const { error } = usuarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errores: error.details.map((err) => err.message) });
  }
  next();
};
