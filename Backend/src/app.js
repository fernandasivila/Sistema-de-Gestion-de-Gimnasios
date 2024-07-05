const express = require("express");
const cors = require("cors");
const dbconnect = require('./database/database');
const usersRoutes = require("./routes/user");
const adsRoutes = require("./routes/ad");
const rolesRoutes = require("./routes/role");
const attendanceRecordsRoutes = require("./routes/attendanceRecord");
const classesRoutes = require("./routes/class");
const coachesRoutes = require("./routes/coach");
const exercisesRoutes = require("./routes/exercise");
const feedbacksRoutes = require("./routes/feedback");
const membersRoutes = require("./routes/member");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//ROUTES
app.use('/users', usersRoutes);
app.use('/roles', rolesRoutes);
app.use('/ads', adsRoutes);
app.use('/attendanceRecords', attendanceRecordsRoutes);
app.use('/classes', classesRoutes);
app.use('/coaches', coachesRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/feedbacks', feedbacksRoutes);
app.use('/members', membersRoutes);

app.listen(PORT, () => {
  console.log(`[server]: running on port: http://localhost:${PORT}`);
})

dbconnect();