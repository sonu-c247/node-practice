const express = require("express");
const router = express.Router();
const { PostController } = require("../controllers");
const { Authorize } = require('../middlewares');

router.use(Authorize.parseHtml)

router.get("/", PostController.index);
router.post("/", PostController.store);
router.put("/:id", PostController.update);
router.delete("/", PostController.destroy);
router.get("/:id", PostController.details);

module.exports = router;
