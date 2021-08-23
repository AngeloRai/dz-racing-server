const router = require("express").Router();
const { log } = require("console");
const { Race, Pilot, Circuit, RaceResult, Team } = require("../models");

//CREATE RACE
router.post("/race", async (req, res) => {
  const { circuitId, name, date } = req.body;

  try {
    const race = await Race.create({ circuitId, name, date });
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(res.statusText);
    console.log(race);

    return res.json(race);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// READ ALL RACES
router.get("/races", async (req, res) => {
  try {
    const races = await Race.findAll({
      order: [
        ["date", "ASC"],
      ],
      include: [
        {
          model: Circuit,
          as: "circuit",
        },
        {
          model: RaceResult,
          as: "raceResults",
          order: [
            ["position", "DESC"],
          ],
          include: [
            {
              model: Pilot,
              as: "pilot",
              include: [
                {
                  model: Team,
                  as: "teams",
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json(races);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//FIND ONE RACE
router.get("/race/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const race = await Race.findOne({
      where: { id },
      include: [
        {
          model: Circuit,
          as: "circuit",
        },
        {
          model: RaceResult,
          as: "raceResults",
          include: [
            {
              model: Pilot,
              as: "pilot",
              include: [
                {
                  model: Team,
                  as: "teams",
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json(race);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE RACE
router.put("/race/:id", async (req, res) => {
  const { id } = req.params;
  const { circuitId, name, date } = req.body;
  console.log(req.body);
  try {
    const race = await Race.findOne({ where: { id } });

    console.log(race);
    race.circuitId = circuitId;
    race.name = name;
    race.date = date;

    await race.save();

    console.table(race);
    return res.json(race);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELTE ONE RACE
router.delete("/race/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await RaceResult.destroy({where: {raceId: id}})
    
    await Race.destroy({ where: { id } });

    return res.json({ message: `Race ${id} deleted!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
