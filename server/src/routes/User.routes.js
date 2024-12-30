const express = require('express');
const { registerUser, loginUser } = require('../controllers/User.controller');
const validateRequestBody = require('../utils/validateRequests');

const userRouter = express.Router()

userRouter.post("/register",
    validateRequestBody([
        'email',
        'password',
        'name'
    ]),
    registerUser)
userRouter.post("/login",
    validateRequestBody([
        'email',
        'password'
    ]),
    loginUser)

module.exports = userRouter