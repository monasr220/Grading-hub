import Task from "../models/Task";
import mongoose from "mongoose";

const createTask = async (req ,res)=>{
    try{    
        const newTask = new Task({...req.body,
            createdBy:req.body._id}
        );
        const savedTask = await newTask.save();
        res.json(savedTask);
    }
    catch(error){
        res.status(500).json({error :error.message});
    };
};

const getAllTasks = async (req, res)=>{
    try{
        const tasks = await Task.find({});
        res.json(tasks);
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
};

const getSpecifiTask = async (req , res)=>{
    try{
        const {id}  =req.params;
        const specificTask = await Task.findById(id);

        if(!specificTask){
            return res.status(404).json({message :"Movie not found"});
        };
        res.json(specificTask);
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
};

const updateTask = async (req ,res)=>{
    try{
        const {id} = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id , req.body ,{
            new :true
        });
        if(!updatedTask){
            return res.status(404).json({message :"Task not found"})
;        }
            res.json(updatedTask)
    }
    catch(error){
        res.status(500).json({error : error.message});
    }};

const getNewTask = async (req ,res)=>{
    try{
        const newTask = await Task.find().sort({createdAt :-1}).limit(1);
        res.json(newTask);    
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
};
const deleteTask =  async (req , res)=>{
    try{
        const {id} = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);

        if(!deleteTask){
            return res.status(404).json({message : "Task not found"});
        }
        res.json({message : "Task Deleted Successfully"});
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
};
export {
    createTask,
    getAllTasks,
    getSpecifiTask,
    getNewTask,
    deleteTask,
    updateTask
};