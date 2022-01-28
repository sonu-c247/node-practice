const express = require("express");
const router = express.Router();
const { PostController } = require("../controllers");
const Authorize = require("../middlewares/Authorize");


router.get("/", PostController.index);
router.post("/", Authorize,PostController.store);
router.put("/:id", PostController.update);
router.delete("/", PostController.destroy);
router.get("/:id", PostController.details);

module.exports = router;
