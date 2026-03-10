import Submission from "../models/Submission";

import asyncHandler from "../middlewares/asyncHandler";

const createSub = asyncHandler(async (req ,res) =>{
    try{
        const {task , fileUrl} = req.body;

    if(!task || !fileUrl){
    return res.status(400).json({ error: "task and fileUrl are required" });
        }

        const existionSub = await Submission.findOne({user:req.user._id , task});
     if(existionSub)return res.status(400).json({ error: "You already submitted this task" });
     const sub = await new Submission({
        user : req.user._id,
        task,
        fileUrl,
     }).save();


     res.status(201).json(sub);   
    }

    
    catch(error){
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateSub = asyncHandler(async (req , res)=>{
    try{
        const {grade ,feedback}  = req.body
        const {id} = req.params;

        const sub = await Submission.findOne({_id: id});
        if(!sub){
            return res.status(404).json({error :"Submission not Found"})
        }
        sub.grade = grade ?? sub.grade;
        sub.feedback = feedback ?? sub.feedback;

        const updateSub = await sub.save();
        res.json(updateSub);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error :"Internal Server Error"})
        
    }
});

const removeSub = asyncHandler(async (req ,res)=>{
    try{
        const {id} = req.params;
        const removed =await Submission.findByIdAndDelete(id);

        if(!removed){
            return res.status(404).json({error: "Submission not found"});
        };
        res.json(removed);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error : "Interval server Error"});
    }
});

const listSub = asyncHandler(async (req , res)=>{
    try{
        const all = await Submission.find({});
        res.json(all);

    }
    catch(error){
        console.error(error);
        return res.status(400).json(error.message);
    }
});
const readSub = asyncHandler(async (req,res)=>{
    try{
        const sub = await Submission.findOne({_id : req.params.id});
        res.json(sub);
    }

    catch(error){
        console.error(error);
        return res.status(404).json(error.message)
        
    }
})

export {
createSub,
updateSub,
removeSub,
listSub,
readSub}