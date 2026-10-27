// The single place that maps URLs to route files.
const { Router } = require('express');
const currentUser = require('../middlewares/current-user');

const router = Router();

// Week 10 Hub Contract endpoints
router.use('/health', require('./health.routes'));
router.use('/game-info', require('./game-info.routes'));
router.use('/results', require('./results.routes'));

// Week 11: identify the current user
router.use(currentUser);

// Module 1: Game Settings CRUD
router.use('/game-settings', require('./game-setting.routes'));

// Module 2: Game Sessions (we will add this later)

module.exports = router;