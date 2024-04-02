const {
  register,
  verifyUser,
  resendVerification,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.get("/verifyemail/:token", verifyUser);
router.post("/resendverification", resendVerification);
module.exports = router;
