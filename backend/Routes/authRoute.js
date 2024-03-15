const express = require('express');
const authController = require('../Controllers/authController');

const authRouter = express.Router();

authRouter.post("/adminlogin", authController.adminlogin);

authRouter.post('/userlogin', authController.userlogin);

authRouter.post('/adduser', authController.adduser);

module.exports = authRouter;