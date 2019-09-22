const router = require("express").Router();
const Admin = require("./models/Admin");
const {
  registerValidation,
  loginValidation
} = require("./controllers/Validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // VALIDATE THE DATA BEFORE WE MAKE A ADMIN
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if Admin is already in the database
  const userExist = await Admin.findOne({ user: req.body.user });
  if (userExist) return res.status(400).send("User Already Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //CREATE A NEW ADMIN
  const admin = new Admin({
    user: req.body.user,
    password: hashedPassword
  });

  try {
    const savedAdmin = await admin.save();
    res.send({ user: savedAdmin._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  // VALIDATE THE DATA BEFORE WE MAKE A ADMIN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Admin.findOne({ user: req.body.user });
  if (!user) return res.status(400).send("User does not exists");

  //PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
