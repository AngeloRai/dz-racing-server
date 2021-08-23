const router = require("express").Router();

const { Team } = require("../models");

//CREATE TEAM
router.post("/team", async (req, res) => {
    const { name } = req.body;
  
    try {
      const team = await Team.create({ name });
  
      console.table(team);
      return res.json(team);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

//READ ALL TEAMS
router.get("/teams", async (req, res) => {
    try {
      const teams = await Team.findAll();
  
      return res.json(teams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });
  
  //FIND ONE TEAM
  router.get("/team/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const team = await Team.findOne({
        where: { id },
        include: "pilots",
      });
  
      return res.json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });
  
  //UPDATE ONE TEAM
  router.put("/team/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const team = await Team.findOne({ where: { id } });
  
      console.log(team.name);
      team.name = name
  
      await team.save();
  
      console.table(team);
      return res.json(team);
    } catch (err) {
      console.log(err);
      return res.status(500).json("Something went wrong!");
    }
  });
  
  //DELETE ONE TEAM
  router.delete("/team/:id", async (req, res) => {
    const { id } = req.params;
    const team = await Team.findOne({ where: { id } });
    try {
      await Team.destroy({ where: { id } });
  
      return res.json({ message: `Team ${team.name} deleted!` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong!" });
    }
  });


  module.exports = router;