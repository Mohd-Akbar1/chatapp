import mongoose from "mongoose";

const conversationSchema=mongoose.Schema({
   paticipants:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
   }],
   message:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'message',
      default:[]},
},{timestamps:true})

const conversation=mongoose.model('conversation',conversationSchema)
export default conversation
