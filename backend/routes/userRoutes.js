const router = require("express").Router(),
	userController = require("../controllers/userController");

router.post("/create", userController.create);
router.post("/login", userController.authenticate);
// router.get("/logout", userController.logout);
router.get("/user", userController.checkToken, userController.getUser);
router.get("/:userId/log", userController.getLog);
router.post("/:userId/log", userController.addToLog);
router.delete("/:userId/log/:albumId", userController.removeFromLog);

module.exports = router;
