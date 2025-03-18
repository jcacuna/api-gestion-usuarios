import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno

// console.log("Mongo URI:", process.env.MONGO_URI); // Depuración

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("⚠️ No se encontró MONGO_URI en el archivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
