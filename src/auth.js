const router = require("express").Router();
const Admin = require("./models/Admin");
const {
  registerValidation,
  loginValidation
} = require("./controllers/Validation");
const bcryptjs = require("bcryptjs");
const { hashPassword } = require("./controllers/hashController");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // VALIDATE THE DATA BEFORE WE MAKE A ADMIN
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if Admin is already in the database
  const userExist = await Admin.findOne({ user: req.body.user });
  if (userExist) return res.status(400).send("User Already Exists");

  // const salt = await bcryptjs.genSalt(10);
  // const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  const hashedPassword = await hashPassword(req.body.password);

  //CREATE A NEW ADMIN
  const admin = new Admin({
    user: req.body.user,
    password: hashedPassword
  });

  const savedAdmin = await admin.save();
  res.send({ user: savedAdmin._id });
});

//LOGIN

router.post("/login", async (req, res) => {
  // VALIDATE THE DATA BEFORE WE MAKE A ADMIN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Admin.findOne({ user: req.body.user });
  if (!user) return res.status(400).send("User does not exists");

  //PASSWORD IS CORRECT
  const validPassword = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.status(400).send("Invalid Password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
