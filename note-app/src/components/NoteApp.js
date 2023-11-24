import React, { useState, useEffect } from 'react';
import NoteInput from './NoteInput'
import NoteList from './NoteList'
import PendingNotes from './PendingNotes'
import CompletedNotes from './CompletedNotes';

function NoteApp(props) {
  const [activeTab, setActiveTab] = useState(0);
  const pendingNotes = props.noteList.filter((note) => !note.isCompleted);
  const completedNotes = props.noteList.filter((note) => note.isCompleted);
  // console.log("noteList : ",props.noteList)
  // console.log("Pending : ", pendingNotes)
  // console.log("Completed : ", completedNotes)
  
  // useEffect(() => {
  //   setPendingNotes(props.noteList.filter((note) => note.isCompleted === false) || []);
  //   setCompletedNotes(props.noteList.filter((note) => note.isCompleted === true) || []);
  // }, [props.noteList]);

  const tabHeaders = [
    { icon: 'fa fa-plus', text: 'New Task' },
    { icon: 'fa fa-pencil-square', text: 'Notes List' },
    { icon: 'fa fa-clock', text: 'Pending' },
    { icon: 'fa fa-check', text: 'Completed' }
  ];

  const tabContentData = [
    {
      title: 'New Task',
      content: <NoteInput noteList={props.noteList} setNoteList={props.setNoteList} isCompleted={props.isCompleted} setIsCompleted={props.setIsCompleted}/>
    },
    {
      title: 'Notes List',
      content: <NoteList noteList={props.noteList} setNoteList={props.setNoteList} isCompleted={props.isCompleted} setIsCompleted={props.setIsCompleted}/>
    },
    {
      title: 'Pending Tasks',
      content: <PendingNotes noteList={pendingNotes} setNoteList={props.setNoteList}/>
    },
    {
      title: 'Completed Tasks',
      content: <CompletedNotes noteList={completedNotes} setNoteList={props.setNoteList}/>
    }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (!Array.isArray(props.noteList)) {
    // Handle the case where noteList is not an array (you can return a loading indicator or an empty list)
    return <div>Loading...</div>; // or <></> for an empty fragment
  }

  return (
    <div className="tabs">
      <div className="tab-header">
        {tabHeaders.map((header, index) => (
          <div
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            <i className={header.icon}></i> {header.text}
          </div>
        ))}
      </div>
      <div className="tab-indicator" style={{ top: `calc(80px + ${activeTab * 50}px)` }}></div>
      <div className="tab-content">
        {tabContentData.map((tab, index) => (
          <div key={index} className={activeTab === index ? 'active' : ''}>
            <i className={tabHeaders[index].icon}></i>
            <h2>{tab.title}</h2>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteApp;