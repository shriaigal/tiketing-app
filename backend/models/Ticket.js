const mongoose=require('mongoose');
const TicketSchema=new mongoose.Schema({
    title:String,
    description:String,
    createdby:String,
    priority:{type:String,default:'Low'},
    status:{type:String,default:'Open'},
    createdAt:{type:Date,default:Date.now}
});
module.exports=mongoose.model('Ticket',TicketSchema);