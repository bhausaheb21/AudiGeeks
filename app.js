const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const AuthRouter = require('./routes/AuthRoutes');
const profileRouter = require('./routes/ProfileRoutes');

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello there !!' })
})

app.use('/auth', AuthRouter)
app.use('/profile',profileRouter)
app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(404).json({ message: err.message })
})

mongoose.connect(process.env.DATABASE_URL).then(res => {
    app.listen(process.env.PORT, () => {
        console.clear()
        console.log("Server Started.........");
    })
})
    .catch(err => {
        console.log("Server failed");
        console.log(err.message);
    })