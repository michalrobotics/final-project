const express = require('express');
const cors = require('cors');;
require('dotenv').config();
require('./db/mongoose');
const requestRouter = require('./routers/request');
const userRouter = require('./routers/user');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(requestRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is running');
});
