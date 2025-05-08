require("dotenv").config();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const users = [
  {
    nom: "Admin",
    email: "admin@campus.edu",
    password: "admin123",
    role: "1",
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
      console.log(`Created user: ${user.email}`);
    }
    console.log("All users created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();
