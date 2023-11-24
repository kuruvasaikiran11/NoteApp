import React, {useState} from 'react'
import styles from './NoteInput.module.css'
import  Button from '@mui/material/Button'
import { Input } from '@mui/material'


function NoteInput(props) {
    let [note, setNote] = useState("");
    // let [noteList, setNoteList] = useState([...props.noteList])
    const handleClick= ()=>{
        if(note.length !== 0 ){
            const updatedList = [...props.noteList, {note, isCompleted : props.isCompleted}];
            props.setNoteList(updatedList)
            localStorage.setItem("noteList", JSON.stringify(updatedList));
            setNote('')
        }else{
            alert("Invalid Note");
        }
    }
    const handleChange = (e)=>{
        setNote(e.target.value)
    }
    const handleKeyUp = (e)=>{
        if(note.length !== 0){
            if(e.key === "Enter"){
                const updatedList = [...props.noteList, {note, isCompleted : props.isCompleted}]
                // props.setNoteList(updatedList)
                props.setNoteList(updatedList)
                setNote('')
                localStorage.setItem("noteList", JSON.stringify(updatedList));
            }
        }else{
            alert("Invalid Note");
        }
    }
  return (
    <>
        <div className={styles.input}>
            <Input variant='standard' placeholder='Enter your task' className={styles.inputText} value={note} onChange={handleChange} onKeyUp={handleKeyUp}></Input>
            {/* <TextField variant='filled' label="Enter your task" className={styles.inputText} value={note} onChange={handleChange} onKeyUp={handleKeyUp}></TextField> */}
            <Button variant='contained' onClick={handleClick}>Submit</Button>
        </div>
    </>
  )
}

export default NoteInput