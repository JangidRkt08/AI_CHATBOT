import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },

  //assistant of the user

  role: {
    type: String,
    required: true,
  },

  //message property of the user

  content: {
    type: String,
    required: true,
  },
  
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema]
});

export default mongoose.model("User",userSchema)
