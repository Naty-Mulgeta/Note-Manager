import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import dns from "node:dns/promises"
import rateLimiter from "./middleware/rateLimiter.js"
import cors from "cors"

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

dotenv.config()

const app=express()
const PORT=process.env.PORT || 5001 //we put 5001 as fallback value incase PORT didn't work

app.use(cors({
    origin:"http://localhost:5173",
}))
 
app.use(express.json()) //to access title and Description in notesController //we send them as a json //to get access to the req.body 

app.use(rateLimiter)


app.use("/api/notes",notesRoutes)

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT)
})
})

