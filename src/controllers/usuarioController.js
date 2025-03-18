import Usuario from "../models/usuarioModel.js";
import { usuarioSchema } from "../schemas/usuarioSchema.js";

export const crearUsuario = async (req, res, next) => {
  try {
    // Validar datos con Joi
    const { error } = usuarioSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationError = new Error("Error de validación");
      validationError.name = "ValidationError";
      validationError.details = error.details.map((detail) => detail.message);
      return next(validationError);
    }

    const { email } = req.body;
    const emailExistente = await Usuario.findOne({ email });

    if (emailExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const totalUsuarios = await Usuario.countDocuments();
    const usuarios = await Usuario.find()
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      totalUsuarios,
      totalPages: Math.ceil(totalUsuarios / limit),
      currentPage: page,
      pageSize: usuarios.length,
      usuarios,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { email } = req.body;

    if (email) {
      const emailExistente = await Usuario.findOne({
        email,
        _id: { $ne: req.params.id },
      });

      if (emailExistente) {
        return res.status(400).json({ error: "El email ya está registrado" });
      }
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};

export const buscarUsuariosPorCiudad = async (req, res, next) => {
  const { ciudad } = req.query;

  if (!ciudad) {
    return res.status(400).json({ error: "Debe proporcionar una ciudad" });
  }

  try {
    const usuarios = await Usuario.find({
      "direcciones.ciudad": { $regex: new RegExp(`^${ciudad.trim()}$`, "i") },
    });

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron usuarios en esa ciudad" });
    }

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
