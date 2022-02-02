const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");
const {Authorize} = require("../middlewares");

router.get("/", UserController.index);
router.post("/",Authorize.validation,UserController.store);

router.put("/:id", UserController.update);
router.delete("/", UserController.destroy);
router.get("/:id", UserController.details);

module.exports = router;
