const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");
const PORT = 4000;
const app = express();

app.use(cors());

app.use(express.json());

const pilotRouter = require("./routes/pilot.routes");
app.use("/", pilotRouter);

const raceRouter = require("./routes/race.routes");
app.use("/", raceRouter);

const teamRouter = require("./routes/team.routes");
app.use("/", teamRouter);

const circuitRouter = require("./routes/circuit.routes");
app.use("/", circuitRouter);

const raceResultRouter = require("./routes/raceResult.routes");
app.use("/", raceResultRouter);

const positionPointsRouter = require("./routes/position.routes");
app.use("/", positionPointsRouter);

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected ");
});
