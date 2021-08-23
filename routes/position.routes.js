const router = require("express").Router();

const { Position } = require("../models");

//CREATE POSITIONS
router.post("/position", async (req, res) => {
  const { position, points } = req.body;

  try {
    const positionPoint = await Position.create({ position, points });

    console.table(positionPoint);
    return res.json(positionPoint);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL POSITIONS
router.get("/positions", async (req, res) => {
  try {
    const positionPoint = await Position.findAll();

    return res.json(positionPoint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE POSITION
router.get("/position", async (req, res) => {
  
  try {
    const { id } = req.body;
    const positionPoint = await Position.findOne({ where: { id } });

    return res.json(positionPoint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE POSITION
router.put("/position", async (req, res) => {
   
  try {
    console.log(req.body);
    const { id, position, points } = req.body
        
    const positionPoint = await Position.update({position, points}, { where: { id } });

    console.table(positionPoint);
    return res.json(positionPoint);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE POSITION
router.delete("/position/:id", async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.params);
    await Position.destroy({ where: { id } });

    return res.json({ message: "position  deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
