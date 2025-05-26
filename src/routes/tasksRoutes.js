const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.post("/", tasksController.create); 
router.get("/", tasksController.list);
router.get("/:id", tasksController.detail); 
router.put("/:id", tasksController.update); 
router.delete("/:id", tasksController.remove); 
router.put("/:id/complete", tasksController.markAsCompleted); 
router.put("/:id/incomplete", tasksController.markAsIncomplete); 
router.get("/user/:userId", tasksController.findByUserId); 
router.get("/project/:projectId", tasksController.findByProjectId); 

module.exports = router;