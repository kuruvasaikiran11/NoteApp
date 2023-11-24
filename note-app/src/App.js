// import React, { useState, useEffect } from "react";
// import './App.css';
// import Header from './components/Header'
// import NoteList from './components/NoteList'
// import NoteInput from "./components/NoteInput";
// import NoteApp from './components/NoteApp'

// function App() {
//   // let [noteList, setNoteList] = useState([]);

//   // const [noteList, setNoteList] = useState(JSON.parse(localStorage.getItem("noteList")) || [])
//   const storedNoteList = localStorage.getItem("noteList") || [];

//   // Use an empty array as the initial state if there's no stored value in localStorage
//   // const [noteList, setNoteList] = useState(storedNoteList ? JSON.parse(storedNoteList) : []);
//   const [noteList, setNoteList] = useState(() => {
//     try {
//       // Attempt to parse the stored value, return an empty array if it fails
//       return JSON.parse(storedNoteList);
//     } catch (error) {
//       console.error("Error parsing storedNoteList:", error);
//       return [];
//     }
//   });
//   const [isCompleted, setIsCompleted] = useState(false)

//   useEffect(() => {
//     // If there's a stored value, update the state with the parsed value
//     try {
//       const parsedData = JSON.parse(storedNoteList);
//       setNoteList(parsedData);
//     } catch (error) {
//       console.error("Error parsing storedNoteList in useEffect:", error);
//     }
//   }, [storedNoteList]);

//   return (
//     <>
//       <Header />
//       {/*
//       <NoteInput noteList={noteList} setNoteList={setNoteList} />
//       {noteList.length > 0 ?<NoteList noteList={noteList} setNoteList={setNoteList}/>:""} */}
//       <NoteApp noteList={noteList} setNoteList={setNoteList} isCompleted={isCompleted} setIsCompleted={setIsCompleted}/>
//     </>
//   );
// }

// export default App;

// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import NoteApp from "./components/NoteApp";

function App() {

  if(localStorage.getItem("noteList") === 'undefined'){
    localStorage.setItem("noteList", [])
  }
  // const storedNoteListString = localStorage.getItem("noteList");
  // console.log(storedNoteListString)
  const storedNoteList = localStorage.getItem("noteList")? JSON.parse(localStorage.getItem("noteList")) : []

  // console.log(storedNoteList)
  const [noteList, setNoteList] = useState(storedNoteList)

  // useEffect(() => {
  //     const parsedData = JSON.parse(storedNoteList);
  //     setNoteList(parsedData);
  // }, [storedNoteList]);

  return (
    <>
      <Header />
      <NoteApp noteList={noteList} setNoteList={setNoteList} />
    </>
  );
}

export default App;
