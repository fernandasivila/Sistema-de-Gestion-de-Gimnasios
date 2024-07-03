const express = require("express");
const cors = require("cors");
const dbconnect = require('./database/database');
const usersRoutes = require("./routes/user");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//ROUTES
app.use('/users', usersRoutes);

app.use(PORT, () => {
  console.log(`[server]: running on port: http://localhost:${PORT}`);
});

dbconnect();