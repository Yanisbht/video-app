## StreamDeepBlock

Plateforme web permettant d’uploader, stocker et visionner ses vidéos de manière privée et sécurisée.

# Fonctionnalités

🔐 Création de compte / Connexion utilisateur

⬆️ Upload de vidéos

🎥 Lecture des vidéos personnelles

🗑 Suppression de vidéos

🗄 Stockage des données avec base SQLite

⚙️ Prérequis

L’application fonctionne avec Node.js.

🔗 Télécharger Node.js (version LTS) :
👉 https://nodejs.org

Vérifier l’installation :

node -v
npm -v


Si un numéro de version s’affiche, c’est bon ✅

📦 Installation

Cloner le projet :

git clone URL_DU_PROJET
cd video-app


Installer les dépendances :

npm install

▶️ Lancer le serveur
node server.js


Ou avec redémarrage automatique :

npx nodemon server.js

🌍 Accès au site

Ouvrir dans un navigateur :

http://localhost:3000

🗂 Structure du projet
video-app/
│
├── public/            → Fichiers frontend (HTML / CSS)
├── uploads/videos/    → Vidéos uploadées par les utilisateurs
├── database.db        → Base de données SQLite
├── server.js          → Serveur Node.js (backend)
└── package.json       → Dépendances du projet

🧠 Base de données

Le projet utilise SQLite.

Le fichier database.db est un fichier binaire
➡️ Il ne peut pas être lu dans un éditeur de texte.

Pour l’explorer :
DB Browser for SQLite

❗ Important

Node.js n’est pas inclus dans le projet (trop lourd pour GitHub).
Chaque utilisateur doit l’installer sur son PC avant de lancer l’application.

👨‍💻 Auteur

Projet réalisé par Yanis BUHOT
BUT Métiers du Multimédia et de l’Internet 💻
