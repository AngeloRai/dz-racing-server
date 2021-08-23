const router = require("express").Router();
const { RaceResult, Pilot, Race, Team } = require("../models");

//CREATE RACE RESULT FOR ONE PILOT
router.post("/race-result", async (req, res) => {
  const { raceId, pilotId, position, fastestLapPoint } = req.body;
 
  try {
       
    const raceResult = await RaceResult.create({ raceId, pilotId, position, fastestLapPoint });

    console.log(raceResult);
    return res.json(raceResult);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ ALL RACES
router.get("/race-results", async (req, res) => {
  try {
    const races = await RaceResult.findAll(
      {
        include: [
        {
          model: Pilot,
          as: "pilot",
          include: [
            {
              model: Team,
              as: "teams"
            }
          ]
        },
        {
          model: Race,
          as: "race",
        },
      ]
    }
    );

    return res.json(races);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/race-results", async (req, res) => {
  try {
    const races = await RaceResult.findAll(
      {
        include: [
        {
          model: Pilot,
          as: "pilot",
          include: [
            {
              model: Team,
              as: "teams"
            }
          ]
        },
        {
          model: Race,
          as: "race",
        },
      ]
    }
    );

    return res.json(races);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



//FIND ONE RACE RESULT
router.get("/race-result/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const raceResult = await RaceResult.findOne({
      where: { id },
      include: [
        {
          model: Pilot,
          as: "pilot",
        },
        {
          model: Race,
          as: "race",
        },
      ]
    });

    console.table(raceResult);
    return res.json(raceResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/race-result/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const raceResult = await RaceResult.findOne({
      where: { id },
      include: [
        {
          model: Pilot,
          as: "pilot",
        },
        {
          model: Race,
          as: "race",
        },
      ]
    });

    console.table(raceResult);
    return res.json(raceResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE RACE RESULT
router.put("/race-result/:id", async (req, res) => {
  const { id } = req.params;
  const { pilotId, raceId, position, fastestLapPoint } = req.body;
  console.log(req.body);
  try {
    const raceResult = await RaceResult.findOne({ where: { id } });

    console.table(raceResult);
    raceResult.pilotId = pilotId;
    raceResult.raceId = raceId;
    raceResult.position = position;
    raceResult.fastestLapPoint = fastestLapPoint
    await raceResult.save();

    console.table(raceResult);
    return res.json(raceResult);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE RACE RESULT
router.delete("/race-result/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await RaceResult.destroy({ where: { id } });

    return res.json({ message: `Race Result ${id} deleted!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
