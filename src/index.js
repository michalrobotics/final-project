const express = require('express');
require('./db/mongoose');
const requestRouter = require('./routers/request');
const userRouter = require('./routers/user');

const app = express();

app.use(express.json());
app.use(requestRouter);
app.use(userRouter);

app.listen(3000, () => {
    console.log('Server is running');
})
