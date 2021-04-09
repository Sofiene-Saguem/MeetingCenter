const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EventCard = require("../models/EventCard");
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //1 check if the user already exist
    if (user) {
      return res.status(400).json([{ msg: "user already exist" }]);
    }
    //2 creat a new user
    user = new User({ firstName, lastName, email, password });
    //3 hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //4 save the user
    await user.save();
    //5 login {token}
    const payload = {
      userID: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET);
    //6 send {token,user}
    res.send({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //1 check if the user exist
    if (!user) {
      return res.status(400).json([{ msg: "Bad credentials email" }]);
    }
    //2 compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json([{ msg: "Bad credentials password" }]);
    }
    //3 login user{token,user}
    const payload = {
      userID: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET);

    res.send({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAuthUser = async (req, res) => {
  res.send({ user: req.user });
};
///////
const getEvent = async (req, res) => {
  try {
    const eventCards = await EventCard.find();
    res.send(eventCards);
  } catch (error) {
    res.send(error);
  }
};
const addEvent = async (req, res) => {
  const { imgSrc, title, desc } = req.body;
  try {
    const newEvent = new EventCard({ imgSrc, title, desc });
    await newEvent.save();
    res.send(newEvent);
  } catch (error) {
    res.send(error);
  }
};
const updateEvent = async (req, res) => {
  const eventID = req.params.id;
  try {
    const eventModified = await EventCard.findByIdAndUpdate(
      eventID,
      { ...req.body },
      { new: true }
    );
    res.send(eventModified);
  } catch (error) {
    res.send(error);
  }
};
const deleteEvent = async (req, res) => {
  const eventID = req.params.id;
  try {
    const eventDelete = await EventCard.findByIdAndDelete(eventID);
    res.send(eventDelete);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  register,
  login,
  getAuthUser,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
