const express = require('express');
const User = require('../models/User');
const auth = require("../middleware/auth");
const {nanoid} = require("nanoid")

const router = express.Router();

router.get("/:emeilId", async (req, res) => {
    const user = await User.findOne({
        emeilId: req.params.emeilId
    });
    res.send(user)
})

router.post('/', async (req, res) => {
    const userData = req.body;
    userData.token = nanoid();
    const user = new User({
        emailId: userData.emailId,
        password: userData.password,
        token: userData.token,
        username: userData.username,
        password: userData.password,
        gender: userData.gender,
        lastName: userData.lastName,
        phone: userData.phone
    });

    try {
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({
        emailId: req.body.emailId
        
    });

    const errorMessage = {
        message: "Email or password are invalid"
    };

    if (!user) return res.status(401).send(errorMessage);

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(401).send(errorMessage);

    user.generateToken();
    await user.save();

    res.send(user);

});

router.delete("/sessions", auth,  async(req, res)=> {
    req.user.token= nanoid();
    try{
        await req.user.save();
        res.sendStatus(204)
    }
    catch(e){
        res.status(502).send({message: "Can't log out"})
    }
})


module.exports = router;
