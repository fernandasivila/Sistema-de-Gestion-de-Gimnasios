const express = require("express");
const cors = require("cors");
const dbconnect = require('./database/database');

const monthlyFeesRoutes = require("./routes/monthlyFee");
const monthlyPlansRoutes = require("./routes/monthlyPlan");
const muscleGroupsRoutes = require("./routes/muscleGroup");
const paymentRecordsRoutes = require("./routes/paymentRecord");
const progressRoutes = require("./routes/progress");
const rolesRoutes = require("./routes/role");
const routinesRoutes = require("./routes/routine");
const usersRoutes = require("./routes/user");
const loginRoute = require("./routes/login");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:4200'}));

//ROUTES
app.use('/monthlyFees', monthlyFeesRoutes);
app.use('/monthlyPlans', monthlyPlansRoutes);
app.use('/muscleGroups', muscleGroupsRoutes);
app.use('/paymentRecords', paymentRecordsRoutes);
app.use('/progress', progressRoutes);
app.use('/roles', rolesRoutes);
app.use('/routines', routinesRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoute);
app.listen(PORT, () => {
  console.log(`[server]: running on port: http://localhost:${PORT}`);
})

dbconnect();