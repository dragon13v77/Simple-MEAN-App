const express = require('express');
const router = express.Router();

const ctrlTutorials = require('../controllers/tutorials.controller');
const ctrlLogin = require('../controllers/login.controller');
// Tutorials routes
router
	.route('/tutorials')
	.get(ctrlTutorials.tutorialsGetAll);

router
	.route('/tutorials/:tutorialId')
	.get(ctrlTutorials.tutorialsGetOne);

router
	.route('/login')
	.get(ctrlLogin.usersGetOne);

router
	.route('/logout')
	.get(ctrlLogin.usersLogout);


module.exports = router;