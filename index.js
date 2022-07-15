const express = require("express");
const axios = require("axios");
var cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

const key = process.env.SECRET_KEY;

app.get("/search", async (req, res) => {
  const limit = req.query.limit;
  const item = req.query.item;
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${item}&limit=${limit}`;

  await axios.get(url).then((response) => res.send(response.data));
});

app.get("/trending", async (req, res) => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=20`;

  await axios.get(url).then((response) => res.send(response.data));
});

app.listen(port, () => {
  console.log(`Aplicação rodando...`);
});
