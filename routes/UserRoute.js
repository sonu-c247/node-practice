const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");
const { ValidateUserRequest } = require('../middlewares');

router.get("/", UserController.index);
router.post("/",ValidateUserRequest.signup, UserController.store);
router.put("/:id", UserController.update);
router.delete("/", UserController.destroy);
router.get("/:id", UserController.details);

module.exports = router;
