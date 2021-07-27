import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  }

  function addNote(event) {
    props.onClick(note);
    event.preventDefault();
    // console.log(note);

    // fetch('http://localhost:5000/todos',{
    //   method:"POST",
    //   headers: {"Content-Type":"application/x-www-form-urlencoded"},
    //   data: qs.stringify(note)
    // })

    // axios.post("/todos", note)
    // .then((response)=>{console.log(response);})
    // .catch((err)=>{console.log(err);});
    
    // axios({
    //   method:"POST",
    //   url:'http://localhost:5000/todos',
    //   data: qs.stringify(note),
    //   headers: {"Content-Type":"application/x-www-form-urlencoded"}
    // })
    
    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"
          required
        />
        <textarea
          onChange={handleChange}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          required
        />
        <Fab className = "addBtn" onClick={addNote}>
         <AddIcon/>
        </Fab>
      </form>
    </div>
  );
}

export default CreateArea;
