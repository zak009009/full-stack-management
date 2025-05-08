require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const users = [
  {
    nom: "scolarite",
    email: "scolarite@campus.edu",
    password: "scolarite123",
    role: "4",
  },
];

async function seedUsers() {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        "INSERT INTO utilisateur (id, nom, email, mot_de_passe,role_id) VALUES (null,?, ?, ?,?)",
        [user.nom, user.email, hashedPassword, user.role]
      );
      console.log(`Utilisateur créé : ${user.email}`);
    }
    console.log("Tous les utilisateurs ont été créés avec succès");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la création des utilisateurs:", error);
    process.exit(1);
  }
}

seedUsers();
