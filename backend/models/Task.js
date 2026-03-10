import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  deadline: {
    type: Date
  },

  maxGrade: {
    type: Number,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
  ,
  createdAt :{
    type:Date,
    ref:"User",
    default : Date.now
  }

},
{ timestamps: true }
);
export default taskSchema