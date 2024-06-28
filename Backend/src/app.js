const express = require("express");
const cors = require("cors");
const dbconnect = require("../database/database");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use(PORT, () => {
  console.log(`[server]: running on port: http://localhost:${PORT}`);
});

dbconnect();