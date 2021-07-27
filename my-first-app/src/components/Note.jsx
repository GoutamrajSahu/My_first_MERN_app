import React from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Note(props) {
  function deleteNote() {
    props.onClick(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>

      <DeleteOutlineIcon className="btn" onClick={deleteNote}>DELETE</DeleteOutlineIcon>
    </div>
  );
}

export default Note;
