const User = require('../models/User');

const auth = async(req, res, next) => {
    const token = req.get("Authenticate");

    if(!token)return res.sendStatus(401);

    const user = await User.findOne({token});

    if(!user)return res.sendStatus(401);

    req.user=user;
    next();
}

module.exports = auth;
