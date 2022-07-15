require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.connect('mongodb://localhost/ecommerce')
.then(() =>{
    console.log("DB connected")
}).catch((err) =>{
    console.log(err)
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/image/items',express.static('./image/items/'));

const userRouter = require('./routes/user')
const itemRouter = require('./routes/item')
const cartRouter = require('./routes/cart')
app.use('/Ecommerce',userRouter)
app.use('/Ecommerce',itemRouter)
app.use('/Ecommerce',cartRouter)

const PORT = process.env.PORT || 5100;
app.listen(PORT,(()=>{
    console.log(`Listening at the ${PORT}`)
}))
