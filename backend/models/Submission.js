import mongoose from "mongoose";


const subMissionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }  ,
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        requried:true
    },
    fileUrl:{
        type:String,
        required: true
    },
    grade:{
        type:Number,
        default: null
    },
    feedback:{
        type:String
    },
    submittedAt:{
        type:Date,
        default:Date.now()
    }

});