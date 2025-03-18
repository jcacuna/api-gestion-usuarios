Backend Jr - Prueba Técnica

Este es un proyecto de backend desarrollado con Node.js, Express y MongoDB para la gestión de usuarios.

🚀 Tecnologías Utilizadas

Node.js

Express.js

MongoDB con Mongoose

Joi (para validación de datos)

Swagger (para documentación de la API)

Nodemon (para desarrollo)

📌 Instalación y Configuración

1️⃣ Clonar el repositorio

[git clone https://github.com/tu-usuario/tu-repositorio.git](https://github.com/jcacuna/api-gestion-usuarios.git)


2️⃣ Instalar dependencias

npm install

3️⃣ Configurar variables de entorno

Crear un archivo .env en la raíz del proyecto y agregar:

PORT=3000
MONGO_URI=mongodb://localhost:27017/tu_basedatos

4️⃣ Iniciar el servidor

npm start

Para modo desarrollo con Nodemon:

npm run dev

🛠 Endpoints de la API

📌 Crear un usuario

POST /api/usuarios

{
"nombre": "Juan Pérez",
"email": "juan@example.com",
"edad": 30,
"fecha_creacion": "2024-03-17T10:30:00Z",
"direcciones": [
{
"calle": "Av. Principal",
"ciudad": "Lima",
"pais": "Perú",
"codigo_postal": "15001"
}
]
}

📖 Documentación con Swagger

Para acceder a la documentación interactiva de Swagger:

http://localhost:3000/api-docs


📖 Deploy de la API

https://api-gestion-usuarios.onrender.com/api-docs/

Para acceder a la documentación interactiva de Swagger:

http://localhost:3000/api-docs

🐛 Solución de Problemas

Si la base de datos no responde:

Asegúrate de que MongoDB está corriendo.

Verifica que MONGO_URI en .env es correcta.

Revisa la conexión en server.js.
