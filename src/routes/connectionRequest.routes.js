const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const connectionRqController = require('../controllers/connectionRequest.controller');

const connectionRequestRoute = express.Router();

connectionRequestRoute.post('/request/send/:status/:toUserId', authMiddleware.userAuth, connectionRqController.connectionRequest);

module.exports = connectionRequestRoute;