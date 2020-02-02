const express = require('express');
const router = express.Router();

const ctrlTutorials = require('../controllers/tutorials.controller');
const ctrlLogin = require('../controllers/login.controller');
const ctrlRegister = require('../controllers/register.controller');
// Tutorials routes
router
	.route('/tutorials')
	.get(ctrlTutorials.tutorialsGetAll);

router
	.route('/tutorials/:tutorialId')
	.get(ctrlTutorials.tutorialsGetOne);

router
	.route('/login')
	.get(ctrlLogin.login);

router
	.route('/logout')
	.get(ctrlLogin.logout);

router
	.route('/register')
	.get(ctrlRegister.register);

router
	.route('/checkUnique')
	.post(ctrlRegister.checkUnique);

router
	.route('/profile')
	.get(ctrlLogin.checkProfile);

module.exports = router;