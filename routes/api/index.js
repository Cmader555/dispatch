const router = require("express").Router();
const jwtStrategy = require("passport").authenticate("jwt", { session: false });

// Book routes
router.use("/user", require("./user"));


module.exports = router;