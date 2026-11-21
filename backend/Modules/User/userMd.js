import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    maxlength: [50, "max characters to use is 50"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,"invalid email"],
    lowercase:true,
    trim: true,
  },
  role:{
    type:String,
    enum:["user","admin","superAdmin"],
    default:"user"
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },

},{timestamps:true});
const User = mongoose.model("User",userSchema)
export default User