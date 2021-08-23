const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require('../middlewares/isAdmin')
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { Circuit, Race } = require("../models");

//CREATE CIRCUIT
router.post("/circuit", isAuthenticated, attachCurrentUser, isAdmin, async (req, res) => {
  const { name, city } = req.body;

  try {
    const circuit = await Circuit.create({ name, city });

    console.table(circuit);
    return res.json(circuit);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL CIRCUIT
router.get("/circuits", isAuthenticated, attachCurrentUser, isAdmin, async (req, res) => {
  try {
    const circuit = await Circuit.findAll({ include: "races" });
    // specifies how we want to be able to access our joined rows on the returned data
    return res.json(circuit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE CIRCUIT
router.get("/circuit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const circuit = await Circuit.findOne({
      where: { id },
      include: "races",
    });

    return res.json(circuit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE CIRCUIT
router.put("/circuit/:id", isAuthenticated, attachCurrentUser, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;

  try {
    const circuit = await Circuit.findOne({ where: { id } });

    circuit.name = name;
    circuit.city = city;

    await circuit.save();

    console.table(circuit);
    return res.json(circuit);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE CIRCUIT
router.delete("/circuit/:id", isAuthenticated, attachCurrentUser, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await Circuit.destroy({ where: { id } });

    return res.json({ message: "Circuit deleted! " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
