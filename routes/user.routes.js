const router = require("express").Router();
const bcrypt = require("bcrypt");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const verifyToken = require('../middlewares/verifyToken')
const { User } = require("../models");

//check update route


//CREATE USER
router.post("/sign-up", async (req, res) => {
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    console.table(newUser);
    return res.json(newUser);
  } catch (err) {
    console.log(err.errors);
    return res.status(500).json(err.errors);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // Extract email and password from body request
    const { email, password } = req.body;

    // Search user in the database by email
    const user = await User.findOne({ where: { email } });
   
    // If user is not found, user is not registered
    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not yet registered in our website;" });
    }

    // Verify if password matches with incoming password from the form

    if (await bcrypt.compare(password, user.passwordHash)) {
      // Generate JWT token with the logged user data
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          email: user.email,
          role: user.role,
          id: user.id
        },
        token,
      });
    } else {
      // 401 Unauthorized
      return res.status(401).json({ msg: "Wrong password or email" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//READ ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.errors);
  }
});

//FIND ONE USER
router.get("/user/:id", async (req, res) => {
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

//******Add authentication to routes */

//UPDATE ONE USER
router.put("/user-update/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    
    
    await user.update(data);

    console.table(data);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE USER
router.delete("/user-delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
