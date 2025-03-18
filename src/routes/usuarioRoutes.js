import express from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuariosPorCiudad,
} from "../controllers/usuarioController.js";
import { validarUsuario } from "../middlewares/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios/buscar:
 *   get:
 *     summary: Busca usuarios por ciudad en su dirección
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la ciudad a buscar
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64b5c77f4e8d1f001c9b5a99"
 *                   nombre:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   email:
 *                     type: string
 *                     example: "juan@example.com"
 *                   ciudad:
 *                     type: string
 *                     example: "Lima"
 *       400:
 *         description: Parámetro faltante (ciudad no proporcionada)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuarios/buscar", buscarUsuariosPorCiudad);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - direcciones
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               edad:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 120
 *                 example: 30
 *               fecha_creacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-17T10:30:00Z"
 *               direcciones:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - calle
 *                     - ciudad
 *                     - pais
 *                     - codigo_postal
 *                   properties:
 *                     calle:
 *                       type: string
 *                       example: "Av. Principal"
 *                     ciudad:
 *                       type: string
 *                       example: "Lima"
 *                     pais:
 *                       type: string
 *                       example: "Perú"
 *                     codigo_postal:
 *                       type: string
 *                       example: "15001"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post("/usuarios", validarUsuario, crearUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios con paginación
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de usuarios por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/usuarios", obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/usuarios/:id", obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - direcciones
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan@example.com"
 *               edad:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 120
 *                 example: 30
 *               fecha_creacion:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-17T10:30:00Z"
 *               direcciones:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - calle
 *                     - ciudad
 *                     - pais
 *                     - codigo_postal
 *                   properties:
 *                     calle:
 *                       type: string
 *                       example: "Av. Principal"
 *                     ciudad:
 *                       type: string
 *                       example: "Lima"
 *                     pais:
 *                       type: string
 *                       example: "Perú"
 *                     codigo_postal:
 *                       type: string
 *                       example: "15001"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/usuarios/:id", validarUsuario, actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/usuarios/:id", eliminarUsuario);

export default router;
