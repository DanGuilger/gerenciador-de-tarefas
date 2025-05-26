const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.get("/", commentsController.list); 
router.post("/", commentsController.create);
router.get("/task/:taskId", commentsController.findByTaskId);
router.get("/:id", commentsController.detail); 
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.remove); 

module.exports = router;