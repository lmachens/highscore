const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = process.env.MONGO_URL;
// Database Name
const dbName = "intro";

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
async function initDb() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  db.collection("users").insertOne({ name: "Leon" });
  client.close();
}

initDb();

const app = express();
const port = 8081;

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
