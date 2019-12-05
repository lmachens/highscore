require("dotenv").config();
const express = require("express");
const { initDb, getCollection } = require("./lib/database");

// Connection URL
const url = process.env.MONGO_URL;
// Database Name
const dbName = "intro";

const app = express();
const port = 8081;

app.get("/", async (request, response) => {
  const user = await getCollection("users").findOne();
  response.json(user);
});

initDb(url, dbName).then(() => {
  console.log("Database initialized");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
