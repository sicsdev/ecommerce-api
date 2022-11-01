const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../../middleware/auth");

router.post("/register", userController.postregister);
router.put("/edit", protect, userController.editUser);
router.get("/google/auth", userController.authGoogle);
router.get("/google/reports", userController.getGoogleReports);
router.get("/facebook/auth", userController.authFacebook);
router.get("/facebook/reports", userController.getFacebookReports);


module.exports = router;