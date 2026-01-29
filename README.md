# StreamDeepBlock

##📖 Présentation du projet

StreamDeepBlock est une application web développée dans un objectif pédagogique afin de comprendre le fonctionnement complet d’une application full-stack.

Le projet permet à un utilisateur de :

créer un compte personnel

se connecter de manière sécurisée

uploader ses propres vidéos

visualiser uniquement ses vidéos

supprimer ses contenus

Chaque utilisateur possède donc sa bibliothèque privée.

## 🧩 Fonctionnement technique

L’application repose sur une architecture simple :

🖥 Frontend

Interface réalisée en :

HTML

CSS moderne (design sombre, effet glassmorphism)

JavaScript (fetch API)

Le frontend permet :

l’envoi des formulaires

l’upload de fichiers

l’affichage dynamique des vidéos

## ⚙️ Backend (Node.js)

Le serveur est développé avec Express.js et gère :

l’authentification (sessions)

la réception des formulaires

la gestion des routes protégées

l’upload des fichiers vidéos (Multer)

la communication avec la base de données

## 🗄 Base de données

Une base SQLite est utilisée pour stocker :

Table users
| id | username | password |

Table videos
| id | user_id | title | filename |

Cela permet d’associer chaque vidéo à son utilisateur.

## 🔐 Sécurité

Système de sessions pour garder l’utilisateur connecté

Routes protégées (impossible d’accéder aux vidéos sans être connecté)

Les vidéos affichées sont filtrées par utilisateur

## Structure du projet
video-app/
│
├── public/            → Fichiers frontend (HTML / CSS)
├── uploads/videos/    → Vidéos uploadées par les utilisateurs
├── database.db        → Base de données SQLite
├── server.js          → Serveur Node.js (backend)
└── package.json       → Dépendances du projet

## Prérequis

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


❗ Important

Node.js n’est pas inclus dans le projet (trop lourd pour GitHub).
Chaque utilisateur doit l’installer sur son PC avant de lancer l’application.

## Auteur

Projet réalisé par Yanis BUHOT pour Deepblock
