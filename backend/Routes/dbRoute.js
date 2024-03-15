const express = require('express');
const dbController = require('../Controllers/dbController');

const dbRouter = express.Router();

dbRouter.get('/gettask/:userid', dbController.gettask);

dbRouter.post('/addtask', dbController.addtask);

dbRouter.get('/getprofile/:userid', dbController.getprofile);

dbRouter.post('/finishtask', dbController.finishtask);

dbRouter.get('/getalltask', dbController.getalltask);

dbRouter.post('/deletetask', dbController.deletetask);



module.exports = dbRouter;