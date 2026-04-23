import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({notenat,setNotes}) => { //grabbing the setNotes so the ui can update as soon i we hit delete
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;
    
    //if user say ok(yes)
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((notenat) => notenat._id !== id)); // get rid of the deleted one  //setNotes under HomePage //prev=get all the prev notes
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };



  return (
    <Link // when we click to it it'll take us to notedetail page
      to={`/note/${notenat._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 ml-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{notenat.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{notenat.Description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(notenat.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, notenat._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;