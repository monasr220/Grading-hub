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
        required:true
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
    submitفedAt:{
        type:Date,
        default:Date.now
    }

});
const Submission = mongoose.model("Submission" , subMissionSchema);
export default Submission;