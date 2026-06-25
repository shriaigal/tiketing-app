const express=require('express');
const router=express.Router();
const Ticket=require('../models/Ticket');


// const express = require('express');
// const router = express.Router();
// const Ticket = require('../models/Ticket');

router.post('/',async(req,res)=>{
    try{
        const newTicket=new Ticket({
            title:req.body.title,
            description:req.body.description,
            priority:req.body.priority,
            createdby:req.body.createdby
        });
        const savedTicket=await newTicket.save();
        res.status(201).json(savedTicket);
    }
    catch(err){
        res.status(400).json({message:"Failed to save Ticket", error: err.message});

    }
});
router.get('/',async(req,res)=>{
    try{
        const tickets=await Ticket.find();
        res.json(tickets);
    }catch(error){
        res.status(500).json({message:"Failed to retrive the data..."});
    }
});

//21-05-26
router.put("/:id", async (req, res) => {
    try {
        const updatedinfo = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,{ new: true });

        res.json(updatedinfo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


//router.patch
router.delete('/:id',async(req,res)=>{
    try{
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({message:"Deleted"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

module.exports = router;