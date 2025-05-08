const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// Route de connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Récupérer l'utilisateur et son rôle de la base de données
    const [users] = await pool.query(
      `SELECT u.*, r.nom_role 
       FROM utilisateur u 
       JOIN role r ON u.role_id = r.id 
       WHERE u.email = ?`,
      [email]
    );

    const user = users[0];

    // Debug logs
    console.log("Raw database user data:", user);
    console.log("Role name from database:", user?.nom_role);
    console.log("Role name type:", typeof user?.nom_role);

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
        name: user.nom,
        email: user.email,
        role: user.nom_role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Préparer la réponse
    const responseData = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.nom,
        role: user.nom_role,
      },
    };

    // Debug log
    console.log("Final response data:", responseData);

    // Envoyer la réponse
    res.json(responseData);
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la connexion",
    });
  }
});

module.exports = router;
