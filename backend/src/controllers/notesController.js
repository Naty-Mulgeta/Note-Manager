import Note from "../models/Note.js"

export async function getAllNotes(_,res){ //b/c we didn't use req
    try {
        const notes=await Note.find().sort({createdAt:-1})//importing the note model .find-give us all the notes //createdAt:-1--find the newest note
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes Controller",error)
      res.status(500).json({message:"Internal server error"})  
    }
}

export async function  getNoteById(req,res){
    try {
        const note=await Note.findById(req.params.id)     //importing the note model .find-give us all the notes
        if(!note) return res.status(400).json({message:"Note not found"})

        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getAllNotes Controller",error)
      res.status(500).json({message:"Internal server error"})  
    }
}

export async function createNote(req,res){
   try {
        const {title,Description}=req.body //grabbing the title and Description b/c if a user want to create anote the need to pass the title and Description
        const newNote= new Note({title,Description}) //title:title,Description:Description (we shotened it)
    
       const savedNote=await newNote.save() //saving it in the D.B
       res.status(201).json(savedNote)
    } catch (error) {
     console.error("Error in createNote Controller",error)
      res.status(500).json({message:"Internal server error"})  
   }
}

export async function updateNote(req,res){
   try {
      const {title,Description}=req.body //grabbing the title and Description b/c if a user want to create anote the need to pass the title and Description
      const updatedNote=await Note.findByIdAndUpdate(
               req.params.id,
               {title,Description},
               {
                new:true,
               }
               ); //update the title as well as the Description  new:true(hover it to understand)
      
      if(!updatedNote) return res.status(404).json({message:"Note not found"})

      res.status(200).json({updatedNote})
    } catch (error) {
     console.error("Error in updateNote Controller",error)
      res.status(500).json({message:"Internal server error"})  
   }
}


export async function  deleteNote(req,res){
   try {
       const deleteNote=await Note.findByIdAndDelete(req.params.id)
       if(!deleteNote) return res.status(404).json({message:"Note not found"})
       res.status(200).json({message:"Note deleted successfully"})  
   } catch (error) {
      console.error("Error in updateNote Controller",error)
      res.status(500).json({message:"Internal server error"}) 
   }
}





