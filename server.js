require("dotenv").config();
const express = require("express");
const { initDb } = require("./lib/database");
const { addHighscore, getHighscores } = require("./lib/highscore");

// Connection URL
const url = process.env.MONGO_URL;
// Database Name
const dbName = "highscore";

const app = express();
const port = 8081;

app.use(express.json());

app.get("/", async (request, response) => {
  response.send("Highscores");
});

app.get("/api/highscores", async (request, response) => {
  const highscores = await getHighscores();
  response.json(highscores);
});

app.post("/api/highscores", async (request, response) => {
  const highscore = request.body;
  await addHighscore(highscore);
  response.json();
});

initDb(url, dbName).then(() => {
  console.log("Database initialized");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
