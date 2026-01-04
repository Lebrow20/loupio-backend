import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute.js";
import db from "./config/Database.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: [
    "http://localhost:5173",        // développement
    "https://ton-site.netlify.app"  // production (à remplacer plus tard)
  ]
}));
app.use(bodyParser.json());

app.use(userRoute);

app.get("/", (req, res) => {
  res.send("API Loupio opérationnelle");
});

const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Connexion PostgreSQL réussie");

    // ⚠️ À utiliser UNE SEULE FOIS, puis commenter
    /*await db.sync();
    console.log("Base de données synchronisée");
    */

    app.listen(PORT, () => {
      console.log("Port d'écoute:", PORT);
    });
  } catch (error) {
    console.error("Erreur au démarrage du serveur:", error.message);
  }
};

startServer();