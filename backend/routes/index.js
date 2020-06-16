const router = require("express").Router(),
	userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

module.exports = router;
