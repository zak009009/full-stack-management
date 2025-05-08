const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Récupérer l'utilisateur de la base de données
    const [users] = await pool.query(
      "SELECT * FROM utilisateur WHERE email = ?",
      [email]
    );

    const user = users[0];

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe invalide",
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.mot_de_passe);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email ou mot de passe invalide",
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Envoyer la réponse
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la connexion",
    });
  }
});

module.exports = router;
