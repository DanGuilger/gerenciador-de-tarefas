const express = require('express');
const router = express.Router();

const dashboardRepository = require('../repositories/dashboardRepository');
const dashboardService = require('../services/dashboardService');
const dashboardController = require('../controllers/dashboardController');

const controller = new dashboardController(new dashboardService(new dashboardRepository));

router.get('/dashboard', controller.home.bind(controller));
router.get('/', (req, res) => res.redirect('/dashboard'));

module.exports = router;