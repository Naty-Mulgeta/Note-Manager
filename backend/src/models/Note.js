import mongoose from "mongoose";

//Creating schema

const noteSchema=new mongoose.Schema({
    title:{
     type:String,
     required:true
    },

    Description:{
     type:String,
     required:true
    },
},{timestamps:true})

//Craeting model based of the schema

const Note=mongoose.model("Note",noteSchema)

export default Note