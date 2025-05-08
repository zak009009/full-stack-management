const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user from database
    const [users] = await pool.query(
      "SELECT * FROM utilisateur WHERE email = ?",
      [email]
    );

    const user = users[0];

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe invalide",
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.mot_de_passe);
    if (!isValidPassword) {
      console.log("hash isnt valid !");
      const hashedPass = bcrypt.hash(password);
      console.log(hashedPass);
      return res.status(401).json({
        message: "Email ou mot de passe invalide !",
      });
    } else {
      console.log("hash is valid !");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la connexion",
    });
  }
});

module.exports = router;
