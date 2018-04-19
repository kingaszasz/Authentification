const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controller/user.controller')

userRouter.get('/', User.getUser);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

module.exports = userRouter;