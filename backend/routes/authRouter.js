const express = require("express");
const {
  register,
  login,
  getAuthUser,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/authController");
const {
  loginRules,
  validator,
  registerRules,
} = require("../middleware/bodyValidator");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/register", registerRules(), validator, register);
router.post("/login", loginRules(), validator, login);
router.get("/current_user", isAuth, getAuthUser);
router.get("/event", getEvent);
router.post("/add_event", addEvent);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);
module.exports = router;
