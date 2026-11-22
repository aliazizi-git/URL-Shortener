import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "originalUrl is required"],
    trim: true,
  },
  shortCode: {
    type: String,
    required: [true, "short code is required"],
    unique:true,
    trim:true
  },
  clicks:{
    type:Number,
    default:0   
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    default:null
  }
},{timestamps:true});

const Url = mongoose.model("Url", urlSchema);
export default Url;
