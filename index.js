const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const users = require('./routes/users');
const cors = require('cors');
const {db} = require("./config");


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/users', users);

const run = async() => {
    await mongoose.connect(db.url+db.name, {useNewUrlParser: true});
    console.log("Mongo started")

    app.listen(port, ()=>{
        console.log("App is running on http://localhost:8000")
    })

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(console.log);
