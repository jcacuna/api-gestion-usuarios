import Joi from "joi";

/**
 * Esquema de validación para la creación de un usuario con Joi.
 *
 * @const {Joi.ObjectSchema} usuarioSchema
 */
export const usuarioSchema = Joi.object({
  /**
   * Nombre del usuario (obligatorio, no puede estar vacío)
   * @type {string}
   */
  nombre: Joi.string().trim().min(1).required().messages({
    "any.required": "El campo 'nombre' es obligatorio",
    "string.empty": "El campo 'nombre' no puede estar vacío",
  }),

  /**
   * Correo electrónico del usuario (obligatorio y debe ser un email válido)
   * @type {string}
   */
  email: Joi.string().email().required().messages({
    "any.required": "El campo 'email' es obligatorio",
    "string.email": "El campo 'email' debe ser un correo válido",
    "string.empty": "El campo 'email' no puede estar vacío",
  }),

  /**
   * Edad del usuario (opcional)
   * @type {number}
   */
  edad: Joi.number().optional(),

  /**
   * Fecha de creación del usuario en formato ISO (opcional)
   * @type {string}
   */
  fecha_creacion: Joi.date().iso().optional(),

  /**
   * Lista de direcciones del usuario (obligatoria, debe contener al menos una dirección)
   * @type {Array<Object>}
   */
  direcciones: Joi.array()
    .items(
      Joi.object({
        /**
         * Calle de la dirección (obligatorio)
         * @type {string}
         */
        calle: Joi.string().required().messages({
          "any.required": "El campo 'calle' es obligatorio",
          "string.empty": "El campo 'calle' no puede estar vacío",
        }),

        /**
         * Ciudad de la dirección (obligatorio)
         * @type {string}
         */
        ciudad: Joi.string().required().messages({
          "any.required": "El campo 'ciudad' es obligatorio",
          "string.empty": "El campo 'ciudad' no puede estar vacío",
        }),

        /**
         * País de la dirección (obligatorio)
         * @type {string}
         */
        pais: Joi.string().required().messages({
          "any.required": "El campo 'pais' es obligatorio",
          "string.empty": "El campo 'pais' no puede estar vacío",
        }),

        /**
         * Código postal de la dirección (obligatorio)
         * @type {string}
         */
        codigo_postal: Joi.string().required().messages({
          "any.required": "El campo 'codigo_postal' es obligatorio",
          "string.empty": "El campo 'codigo_postal' no puede estar vacío",
        }),
      })
    )
    .min(1)
    .required(),
});
