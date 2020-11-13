const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cardDetails = require('./models/carddetails');
const bodyParser = require('body-parser');

require('custom-env').env('development');

// app config 
const app = express();
const port =  process.env.PORT || 9000;

// middlewares 
app.use(cors());
app.use(bodyParser.json());

// dbconfig
const connection_url =  `mongodb+srv://admin:${process.env.password}@cluster0.cvar8.mongodb.net/file-test?retryWrites=true&w=majority`;
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;

db.once("open",()=>{
    console.log("db connected.....");
})

// routes

// simple post request to create card details .....
app.post('/api/carddetails', function (req, res) {
    const details = req.body;
    cardDetails.create(details,(err,data)=>{
        if (err) {
            res.status(500).json({
                success:false,
                message:JSON.stringify(err)
            });
        } else {
            res.status(201).json({
                success:true,
                data:data,
                message:"saved successfully"
            });
        }
    })
})

// listen top port
app.listen(port,() => console.log(`Listining on localhost:${port}`) )
 
