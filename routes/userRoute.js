const {
  register,
  verifyUser,
  resendVerification,
  forgotPassword,
  resetPassword,
  login,
  logout,
  makeAdmin,
  getUserslist,
  authorizedlogin,
} = require("../controller/userController");
const { userCheck, validate } = require("../validation");

const router = require("express").Router();

router.post("/register", userCheck, validate, register);
router.get("/verifyemail/:token", verifyUser);
router.post("/resendverification", resendVerification);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.post("/login", login);
router.get("/logout", logout);
router.get("/userlist", authorizedlogin, getUserslist);
router.post("/makeadmin", makeAdmin);

module.exports = router;
