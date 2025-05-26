const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

router.get("/", projectsController.list); 
router.post("/", projectsController.create); 
router.get("/creator/:creatorId", projectsController.findByCreatorId);
router.get("/:id", projectsController.detail); 
router.put("/:id", projectsController.update); 
router.delete("/:id", projectsController.remove); 

module.exports = router;