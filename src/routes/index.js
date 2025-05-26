const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/pages/index.ejs'));
});

router.use("/api/users", require("./usersRoutes"));
router.use("/api/tasks", require("./tasksRoutes"));
router.use("/api/projects", require("./projectsRoutes"));
router.use("/api/comments", require("./commentsRoutes"));

module.exports = router;