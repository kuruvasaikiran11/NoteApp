import React, { useState, useEffect } from "react";
import styles from "./NoteList.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteButton from "@mui/material/Button";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CompletedNotes = (props) => {
  let [checkedItems, setCheckedItems] = useState([]);
  let [isAllSelected, setIsAllSelected] = useState(false);
  // let [isModalOpen, setisModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalId, setModalId] = useState();
  const [editedNote, setEditedNote] = useState("");
  //   const completedNotes = props.noteList.filter((note)=> note.isCompleted === true)
  const handleOpen = (id) => {
    setOpen(true);
    setModalId(id);
    setEditedNote(props.noteList[id].note);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (checkedItems.length === 0 || props.noteList.length === 0) {
      setIsAllSelected(false);
    }
    if (
      props.noteList.length > 0 &&
      checkedItems.length === props.noteList.length
    ) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }
  }, [checkedItems, props.noteList]);

  const handleDeleteClick = (index) => {
    const updatedList = [...props.noteList];
    updatedList.splice(index, 1);
    props.setNoteList(updatedList);
    localStorage.setItem("noteList", JSON.stringify(updatedList));
  };

  const handleToggleCheckBox = (index) => {
    if (checkedItems.includes(index)) {
      const newCheckedList = [...checkedItems].filter(
        (checkedIndex) => checkedIndex !== index
      );
      setCheckedItems(newCheckedList);
    } else {
      const newCheckedList = [...checkedItems, index];
      setCheckedItems(newCheckedList);
    }
  };

  const handleTogleSelectAll = () => {
    if (isAllSelected) {
      setCheckedItems([]);
    } else {
      setCheckedItems([...Array(props.noteList.length).keys()]);
    }
  };

  const handleDeleteMultiple = () => {
    let updatedList = [...props.noteList];

    if (checkedItems.length === updatedList.length) {
      updatedList = [];
    } else {
      // Remove items that are checked from both arrays
      checkedItems
        .sort((a, b) => b - a)
        .forEach((index) => {
          updatedList.splice(index, 1);
        });
    }

    setCheckedItems([]);
    props.setNoteList(updatedList);
    localStorage.setItem("noteList", JSON.stringify(updatedList));
  };

  const handleEditChange = (e) => {
    const updatedNote = e.target.value;
    setEditedNote(updatedNote);
  };

  const handleEditEnter = (e) => {
    if (e.key === "Enter") {
      let updatedList = [...props.noteList];
      updatedList[modalId].note = editedNote;
      props.setNoteList(updatedList);
      localStorage.setItem("noteList", JSON.stringify(updatedList));
      setOpen(false);
      setEditedNote("");
    }
  };
  const handleCancelClick = () => {
    setOpen(false);
    setEditedNote("");
  };

  const handleSaveClick = () => {
    // console.log("Save clicked");
    let updatedList = [...props.noteList];
    updatedList[modalId].note = editedNote;
    // props.setNoteList(updatedList);
    props.setNoteList((prevNoteList) => {
      // Make changes to the prevNoteList
      const newNoteList = [...prevNoteList];
      newNoteList[modalId].note = editedNote;
      return newNoteList;
    });
    localStorage.setItem("noteList", JSON.stringify(updatedList));
    setOpen(false);
    setEditedNote("");
  };

  if (!Array.isArray(props.noteList)) {
    // Handle the case where noteList is not an array (you can return a loading indicator or an empty list)
    return <div>Loading...</div>; // or <></> for an empty fragment
  }

  return (
    <>
      {/* <div className={styles.heading}>
        <h4 className={styles.headingText}>Notes List</h4>
      </div>
      <div>*********************************************************</div> */}
      <div className={styles.menu}>
        <div className={styles.actionBtn}>
          <input
            type="checkbox"
            id="selectAll"
            className={styles.selectAllInput}
            checked={isAllSelected}
            onChange={handleTogleSelectAll}
          ></input>
          {isAllSelected ? (
            <label htmlFor="selectAll" className={styles.selectAllInput}>
              Deselect All
            </label>
          ) : (
            <label htmlFor="selectAll" className={styles.selectAllInput}>
              Select All
            </label>
          )}
          {checkedItems.length > 0 ? (
            <DeleteButton
              variant="contained"
              color="error"
              onClick={handleDeleteMultiple}
            >
              Delete Selected
            </DeleteButton>
          ) : (
            ""
          )}
        </div>
        {props.noteList.length > 0
          ? Object.keys(props.noteList).map((key) => {
              const item = props.noteList[key];
              const index = parseInt(key);
              if (item.isCompleted) {
                return (
                  <>
                    <li key={index} className={styles.menuItem}>
                      <input
                        type="checkbox"
                        id={index}
                        onChange={() => handleToggleCheckBox(index)}
                        checked={checkedItems.includes(index) || isAllSelected}
                        className={styles.noteLabel}
                      ></input>
                      {/* <CheckBox onClick={()=>handleToggleCheckBox(index)} checked={checkedItems.includes(index)}/> */}
                      <label htmlFor={index} className={styles.noteLabel}>
                        <b>{item.note}</b>
                      </label>
                      <div>
                        <EditIcon
                          color="primary"
                          onClick={() => handleOpen(index)}
                        ></EditIcon>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style} className={styles.modalBox}>
                            <input
                              type="text"
                              className={styles.editInput}
                              value={editedNote}
                              onChange={handleEditChange}
                              onKeyUp={handleEditEnter}
                            ></input>
                            <div>
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                className={styles.modalBtn}
                                //   onClick={()=>{const newCompletedNotes = [...props.noteList]; newCompletedNotes[modalId].isCompleted = false;
                                //     props.setCompletedNotes(newCompletedNotes);}}
                                onClick={() => {
                                  props.noteList[modalId].isCompleted = false;
                                  localStorage.setItem(
                                    "noteList",
                                    JSON.stringify(props.noteList)
                                  );
                                  setOpen(false);
                                }}
                              >
                                Pending
                              </Button>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                className={styles.modalBtn}
                                //   onClick={()=>{const newCompletedNotes = [...props.noteList]; newCompletedNotes[modalId].isCompleted = true;
                                //     props.setCompletedNotes(newCompletedNotes);}}
                                onClick={() => {
                                  props.noteList[modalId].isCompleted = true;
                                  localStorage.setItem(
                                    "noteList",
                                    JSON.stringify(props.noteList)
                                  );
                                  setOpen(false);
                                }}
                              >
                                Completed
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={styles.modalBtn}
                                onClick={handleSaveClick}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                className={styles.modalBtn}
                                onClick={handleCancelClick}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Box>
                        </Modal>
                        <DeleteIcon
                          color="action"
                          onClick={() => handleDeleteClick(index)}
                        />
                      </div>
                    </li>
                  </>
                );
              } else {
                return null;
              }
            })
          : ""}
      </div>
    </>
  );
};

export default CompletedNotes;
