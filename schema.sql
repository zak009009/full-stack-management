-- 1. Create and select database
CREATE DATABASE IF NOT EXISTS gestion_personnel_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE gestion_personnel_db;

-- 2. role
CREATE TABLE IF NOT EXISTS role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_role VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- 3. utilisateur (users)
CREATE TABLE IF NOT EXISTS utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  mot_de_passe VARCHAR(255),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id)
) ENGINE=InnoDB;

-- 4. service (departments)
CREATE TABLE IF NOT EXISTS service (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_service VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- 5. personnel (employees)
CREATE TABLE IF NOT EXISTS personnel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  email VARCHAR(100),
  telephone VARCHAR(20),
  utilisateur_id INT,
  service_id INT,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
  FOREIGN KEY (service_id)    REFERENCES service(id)
) ENGINE=InnoDB;

-- 6. absence
CREATE TABLE IF NOT EXISTS absence (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT,
  date_absence DATE,
  motif TEXT,
  FOREIGN KEY (personnel_id) REFERENCES personnel(id)
) ENGINE=InnoDB;

-- 7. conge (leave)
CREATE TABLE IF NOT EXISTS conge (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT,
  date_debut DATE,
  date_fin   DATE,
  type_conge VARCHAR(50),
  statut     VARCHAR(20),
  FOREIGN KEY (personnel_id) REFERENCES personnel(id)
) ENGINE=InnoDB;

-- 8. notification
CREATE TABLE IF NOT EXISTS notification (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT,
  contenu TEXT,
  date_envoi DATETIME,
  FOREIGN KEY (personnel_id) REFERENCES personnel(id)
) ENGINE=InnoDB;

-- 9. annonce (announcements)
CREATE TABLE IF NOT EXISTS annonce (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255),
  contenu TEXT,
  date_publication DATE
) ENGINE=InnoDB;

-- 10. valider_annonce (acknowledgements)
CREATE TABLE IF NOT EXISTS valider_annonce (
  id INT AUTO_INCREMENT PRIMARY KEY,
  annonce_id    INT,
  utilisateur_id INT,
  date_validation DATE,
  FOREIGN KEY (annonce_id)     REFERENCES annonce(id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
) ENGINE=InnoDB;

-- 11. salaire (salary records)
CREATE TABLE IF NOT EXISTS salaire (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personnel_id INT,
  montant DECIMAL(10,2),
  mois    VARCHAR(20),
  annee   INT,
  FOREIGN KEY (personnel_id) REFERENCES personnel(id)
) ENGINE=InnoDB;

-- 12. enseignant (teachers)
CREATE TABLE IF NOT EXISTS enseignant (
  id INT PRIMARY KEY,
  thematique VARCHAR(100),
  FOREIGN KEY (id) REFERENCES personnel(id)
) ENGINE=InnoDB;

-- 13. recherche (research projects)
CREATE TABLE IF NOT EXISTS recherche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enseignant_id INT,
  theme        VARCHAR(255),
  date_debut   DATE,
  date_fin     DATE,
  FOREIGN KEY (enseignant_id) REFERENCES enseignant(id)
) ENGINE=InnoDB;