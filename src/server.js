import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { swaggerDocs } from "./config/swagger.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import connectDB from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", usuarioRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Documentación de Swagger
swaggerDocs(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
