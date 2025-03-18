import mongoose from "mongoose";

const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true },
});

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "El email no es válido"],
  },
  edad: { type: Number, min: 0 },
  fecha_creacion: { type: Date, default: () => new Date() },
  direcciones: {
    type: [direccionSchema],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
