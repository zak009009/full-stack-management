-- Insert roles
INSERT INTO role (nom_role) VALUES
('Doyen'),
('Bibliothécaire'),
('Administrateur'),
('Enseignant'),
('Scolarité');

-- Insert users with role_id
INSERT INTO utilisateur (nom, email, mot_de_passe, role_id) VALUES
('Dr. Ahmed', 'ahmed.doyen@universite.com', 'motdepasse1', 1),
('Fatima El Fassi', 'fatima.biblio@universite.com', 'motdepasse2', 2),
('M. Hassan', 'hassan.admin@universite.com', 'motdepasse3', 3),
('Dr. Mohamed', 'mohamed.enseignant@universite.com', 'motdepasse4', 4),
('Sophie K.', 'sophie.scolarite@universite.com', 'motdepasse5', 5);

-- Insert services
INSERT INTO service (nom_service) VALUES
('Département Informatique'),
('Bibliothèque'),
('Administration'),
('Recherche'),
('Scolarité');

-- Insert personnel
INSERT INTO personnel (nom, prenom, email, telephone, utilisateur_id, service_id) VALUES
('Ahmed', 'Doyen', 'ahmed.doyen@universite.com', '0612345678', 1, 1),
('Fatima', 'El Fassi', 'fatima.biblio@universite.com', '0612345679', 2, 2),
('Hassan', 'El Fassi', 'hassan.admin@universite.com', '0612345680', 3, 3),
('Mohamed', 'Ziani', 'mohamed.enseignant@universite.com', '0612345681', 4, 4),
('Sophie', 'K.', 'sophie.scolarite@universite.com', '0612345682', 5, 5);

-- Insert absence
INSERT INTO absence (personnel_id, date_absence, motif) VALUES
(1, '2025-05-10', 'Congé personnel');

-- Insert conge
INSERT INTO conge (personnel_id, date_debut, date_fin, type_conge, statut) VALUES
(4, '2025-06-01', '2025-06-10', 'Vacances', 'Approuvé');

-- Insert notification
INSERT INTO notification (personnel_id, contenu, date_envoi) VALUES
(4, 'Nouveau matériel pour les cours de programmation disponible en bibliothèque.', '2025-05-05 10:00:00');
