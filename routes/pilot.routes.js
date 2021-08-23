const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require('../middlewares/isAdmin')
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { Pilot, Team, RaceResult, Race } = require("../models");

//CREATE PILOT
router.post("/pilot", isAuthenticated, attachCurrentUser, isAdmin, async (req, res) => {
  const { teamId, firstName, lastName, isActive } = req.body;
  console.log(req.body);
  try {
    const pilot = await Pilot.create({ teamId, firstName, lastName, isActive });
    
    return res.json(pilot);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL PILOTS
router.get("/pilots", async (req, res) => {
  try {
    const pilots = await Pilot.findAll({
      include: [
        {
          model: Team,
          as: "teams", // specifies how we want to be able to access our joined rows on the returned data

        },
        {
          model: RaceResult,
          as: "raceResults",
          include: [
            {
              model: Race,
              as: "race",
          }
        ]
        },
      ],
    });

    return res.json(pilots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// READ ONLY PILOTS WHICH isActive is true
router.get("/active-pilots", async (req, res) => {
  try {
    const pilots = await Pilot.findAll({
      where: {isActive: true},
      order: [
        ["firstName", "ASC"],
      ],
      include: [
        {
          model: Team,
          as: "teams", // specifies how we want to be able to access our joined rows on the returned data

        },
        {
          model: RaceResult,
          as: "raceResults",
          include: [
            {
              model: Race,
              as: "race",
          }
        ]
        },
      ],
    });

    return res.json(pilots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});


//FIND ONE PILOT
router.get("/pilot/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req);
  console.log(id);
  try {
    const pilot = await Pilot.findOne({
      where: { id },
      include: [
        {
          model: Team,
          as: "teams",
          
        },
        {
          model: RaceResult,
          as: "raceResults",
          include: [
            {
              model: Race,
              as: "race",
          }
        ]
        },
        
      ],
    });

    return res.json(pilot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE PILOT
router.put("/pilot/:id", async (req, res) => {
  const { id } = req.params;
  const { teamId, firstName, lastName, isActive } = req.body;
  console.log(req.body);
  try {
    const pilot = await Pilot.findOne({ where: { id } });

    console.log(pilot.name);
    pilot.teamId = teamId;
    pilot.firstName = firstName;
    pilot.lastName = lastName;
    pilot.isActive = isActive

    await pilot.save();

    console.table(pilot);
    return res.json(pilot);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE PILOT
router.delete("/pilot/:id", async (req, res) => {
  const { id } = req.params;
  const pilot = await Pilot.findOne({ where: { id } })

  try {
    await RaceResult.destroy({where: {pilotId: id}})
    await Pilot.destroy({ where: { id } });

    return res.json({ message: `Pilot ${pilot.firstName} deleted!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
