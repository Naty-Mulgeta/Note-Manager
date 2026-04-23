import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {

  const [rateLimited,setRateLimited]=useState(false)
  const [notes,setNotes]=useState([])                //fetch Notes
  const [loading,setLoading]=useState(true)         //to keep track of loading state //use stste true b/c as soon as we visit the homepage we'll try to fetch the notes so it has to load

//to fetch the notes
useEffect(()=>{
  const fetchNotes=async()=>{
   try { 
                   // fetch API
    // const res =await fetch("http://localhost:5001/api/notes")
    // const data=await res.json()
    // console.log(data)

                  // Axios
      //  const res =await axios.get("http://localhost:5001/api/notes") 
        const res =await api.get("/notes")
       console.log(res.data)
          //instead of consolelogging the data we'd like to update the notes State
          setNotes(res.data)
          setRateLimited(false) //if we are able to get the data it means we are not rate limited         
   } catch (error) {
    console.log("Error fetching notes")
    console.log(error)
    if(error.response?.status===429){
      setRateLimited(true)
    }else{
      toast.error("Failed to load notes")
    }
   } finally {
    setLoading(false)
   }
  }

  fetchNotes()                    // at the end we'd like to pull this function
},[])

  return (
    <div className='min-h-screen'>
     <Navbar/>
    {rateLimited && <RateLimitedUI/>}    {/*iF rateLimited is true display RateLimitedUI */}


  {/*Displaying the notes */}

    <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !rateLimited && <NotesNotFound />}

        {notes.length > 0 && !rateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((notenat) => (
              <NoteCard key={notenat._id} notenat={notenat} setNotes={setNotes} />
             
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;