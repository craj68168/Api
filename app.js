const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

require('./db/mongoose');
const userRouter = require('./routers/user');

app.use(bodyParser.urlencoded({ extended:                                                                                                                                                                                                                                                                                                                                                                                                                                                                   false }));

  
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(userRouter);



app.listen(process.env.PORT, () => {
    console.log(`localhost:${process.env.PORT}`);
});
