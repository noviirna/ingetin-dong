const router = require("express").Router();
const {
  USER_LOGIN,
  USER_REGISTER,
  USER_REQUEST_ACTIVATE,
  USER_ACTIVATE,
  USER_LOGOUT,
  USER_DEACTIVATE,
  USER_RESET_PASSWORD,
  USER_RESET_SECUREWORD,
  USER_UPDATE,
  USER_VIEW_PROFILE
} = require("../constants/endpointsPath").USER_PATH;
const {
  login,
  register,
  activate,
  logout,
  deactivate,
  resetPassword,
  resetSecureWord,
  update,
  viewProfile
} = require("../controllers/UserController");


router.post(USER_LOGIN, login);
router.post(USER_REGISTER, register);
// router.get(USER_REQUEST_ACTIVATE, activate);
router.get(USER_ACTIVATE, activate);
router.get(USER_LOGOUT, logout);
router.get(USER_DEACTIVATE, deactivate);
router.post(USER_RESET_PASSWORD, resetPassword);
router.post(USER_RESET_SECUREWORD, resetSecureWord);
router.post(USER_UPDATE, update);
router.get(USER_VIEW_PROFILE, viewProfile);

module.exports = router;
