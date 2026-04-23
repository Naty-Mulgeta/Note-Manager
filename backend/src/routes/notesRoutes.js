import express from "express"
import { deleteNote, getAllNotes, createNote, updateNote, getNoteById } from "../controllers/notesController.js"

const router=express.Router() // creating a router

router.get("/",getAllNotes) 
router.get("/:id",getNoteById)                                                                                                                                               
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router

