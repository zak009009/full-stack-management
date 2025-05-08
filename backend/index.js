require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test database connection
promisePool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Routes
app.use("/auth", authRoutes);

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API CMS" });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur:", err.stack);
  res.status(500).json({
    status: "erreur",
    message: "Une erreur est survenue !",
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
