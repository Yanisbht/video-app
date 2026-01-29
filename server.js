const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

const multer = require("multer");
const fs = require("fs");

app.use("/videos", express.static("uploads/videos"));


// Permet de lire les formulaires
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers du dossier public
app.use(express.static("public"));

// Session = garder l'utilisateur connecté
app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: true
}));

// Base de données SQLite
const db = new sqlite3.Database("./database.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT,
  filename TEXT
)`);


// Middleware : vérifier si connecté
function auth(req, res, next) {
  if (!req.session.userId) return res.redirect("/");
  next();
}

const storage = multer.diskStorage({
  destination: "uploads/videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ---------- ROUTES ----------

// Landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// INSCRIPTION
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.run("INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err) => {
      if (err) return res.send("Utilisateur déjà existant");
      res.send("Compte créé ! <a href='/'>Se connecter</a>");
    }
  );
});

// CONNEXION
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, user) => {
      if (!user) return res.send("Login incorrect");

      req.session.userId = user.id;
      req.session.username = user.username;

      res.redirect("/dashboard");
    }
  );
});

// DASHBOARD (page protégée)
app.get("/dashboard", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard.html"));
});


//upload

app.post("/upload", auth, upload.single("video"), (req, res) => {
  db.run(
    "INSERT INTO videos (user_id, title, filename) VALUES (?, ?, ?)",
    [req.session.userId, req.body.title, req.file.filename],
    (err) => {
      if (err) return res.status(500).send("Erreur lors de l'upload");
      res.sendStatus(200); // Important pour le fetch()
    }
  );
});



//my-videos

app.get("/my-videos", auth, (req, res) => {
  db.all(
    "SELECT * FROM videos WHERE user_id = ?",
    [req.session.userId],
    (err, videos) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(videos);
    }
  );
});

// Supprimer une vidéo
app.get("/delete/:id", auth, (req, res) => {
  db.get("SELECT * FROM videos WHERE id=?", [req.params.id], (err, video) => {
    if (err || !video) return res.status(404).send("Vidéo non trouvée");

    // Vérifie que l'utilisateur connecté est bien le propriétaire
    if (video.user_id !== req.session.userId) return res.status(403).send("Accès interdit");

    // Supprime le fichier physique
    fs.unlinkSync("uploads/videos/" + video.filename);

    // Supprime la vidéo de la base
    db.run("DELETE FROM videos WHERE id=?", [req.params.id], (err) => {
      if (err) return res.status(500).send("Erreur lors de la suppression");
      res.redirect("/dashboard"); // Retour au dashboard
    });
  });
});



// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});


// ---------- START ----------
app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));
