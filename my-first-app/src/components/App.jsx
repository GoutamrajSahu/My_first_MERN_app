import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import qs from "qs";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
        async function fetchData(){
           const allNotes = await axios.get("http://localhost:5000/todos");
           setNotes(allNotes.data);
          //  console.log(allNotes.data);
        }
        fetchData();
  })

  function onAdd(newNote) {

    axios({
      method:"POST",
      url:'http://localhost:5000/todos',
      data: qs.stringify(newNote),
      headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })

  }

  function deleteNote(id) {
    // console.log(id);
    axios({
      method:"DELETE",
      url:`http://localhost:5000/todoDelete/${id}`,
      headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onClick={onAdd} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note._id}
            title={note.title}
            content={note.content}
            onClick={deleteNote}
          />
        );
      })}
      
      <Footer />
    </div>
  );
}

export default App;
