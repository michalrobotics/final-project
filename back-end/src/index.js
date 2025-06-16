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

app.post('/email', async (req, res) => {
    try {
        console.log('started sending');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: req.body.email,
            from: process.env.EMAIL,
            subject: 'ממיכל',
            text: req.body.content
        };

        const info = await transporter.sendMail(mailOptions);
        res.send(info);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const main = () => {
    fetch('http://localhost:8000/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'michalhe07@gmail.com'
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    }).catch((e) => {
        console.log(e.message);
    });
}

app.listen(port, () => {
    console.log('Server is running');
})

// main();
