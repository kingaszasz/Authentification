const User = require('../models/user')

module.exports = {
  getUser: (req, res) => {
    res.json({
        user: req.user
    })
},

register: (req, res, next) => {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
    }), req.body.password, (err) => {
        if (err) {
            res.json({
                error: err
            })
        }
        res.redirect('/');
    });
},

login: (req, res) => {
    res.redirect('/');
},

logout: (req, res) => {
    req.logout();
    res.redirect('/');
}

}