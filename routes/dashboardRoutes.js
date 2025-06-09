const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

const dashboardRepository = require('../repositories/dashboardRepository');
const dashboardService = require('../services/dashboardService');
const dashboardController = require('../controllers/dashboardController');

const controller = new dashboardController(new dashboardService(new dashboardRepository));

router.get('/dashboard', requireAuth, controller.home.bind(controller));

module.exports = router;