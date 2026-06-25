const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

//mogodb connection mongodb://localhost:27017

mongoose.connect("mongodb://localhost:27017/ticket01DB").then(()=>console.log("Mongodb Connected...")).catch(err=>console.log(err));

const ticketroute=require('./routes/TicketrRoutes');
app.use('/api/tickets',ticketroute);
app.listen(3000,()=>console.log('Server is running on 3000 port...'));
