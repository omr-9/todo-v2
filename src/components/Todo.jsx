import React, { useContext, useState } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, ListItem, Typography, Checkbox, Button, Divider } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, CheckOutlined as CheckOutlinedIcon } from "@mui/icons-material";
import TodoContext from "../context/todoContext";

const Todo = ({ todo }) => {
  const { toggleComplete, handleDeleteTodo, handleUpdateTodo } = useContext(TodoContext);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title: todo.title, description: todo.description });

  const handleDeleteClickOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);
  const handleConfirmDelete = () => {
    handleDeleteTodo(todo.id);  
    setOpenDeleteDialog(false);
  };

  const handleUpdateClickOpen = () => setOpenUpdateDialog(true);
  const handleUpdateClose = () => setOpenUpdateDialog(false);

  const handleInputChange = (e) => setUpdatedTodo({ ...updatedTodo, [e.target.name]: e.target.value });

  const handleSaveUpdate = () => {
    handleUpdateTodo(todo.id, updatedTodo);
    setOpenUpdateDialog(false);
  };

  return (
    
      <ListItem 
        key={todo.id} 
        style={{  display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: todo.completed ? '0.8' : '1',
            backgroundColor: 'white',
            borderRadius: '3px',
            marginTop: '10px',
            padding: '25px 0',
            width:'100%'}}>
       
      <div className='body-div' style={{width:'100%', display :'flex',flexDirection:'row',paddingLeft:'30px'}}>

<div className='content' style={{ display: 'flex', flexDirection: 'column', width:'70%' }}>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h4" color="black" style={{ float:'left', paddingLeft: '10px' ,textDecoration:todo.completed?'line-through':'none',opacity:todo.completed? "0.7" : '1', wordBreak: 'break-word',  maxWidth: '100%', overflow: 'hidden',  whiteSpace: 'normal',textOverflow: 'ellipsis' }}>
      {todo.title}
    </Typography>
    <Typography variant="body2" color="textSecondary" style={{opacity:todo.completed? "0.3" : '1', textDecoration:todo.completed?'line-through' : 'none',marginLeft:'20px', wordBreak: 'break-word',  maxWidth: '100%', overflow: 'hidden',  whiteSpace: 'normal',textOverflow: 'ellipsis',}}>
      {todo.description}
    </Typography>
  </div>
</div>

<div className='btnsDiv' style={{width:'40%'
}} >
  {/* toggle complete  */}
  <IconButton
    className="icon checkIcon"
    style={{
        color: todo.completed ? 'white' : 'rgba(154, 205, 50,0.7)',
      background: todo.completed ? 'rgba(154, 205, 50,0.7)' : 'white',
      border: '3px solid rgba(154, 205, 50,0.7)',
    }}
    size='medium'
    onClick={() => toggleComplete(todo.id)}
    aria-label="toggle complete"
    >
    <CheckOutlinedIcon />
  </IconButton>

    {/*------ toggle complete  -------*/}
  {/* update Button */}
  <IconButton
    size='medium'
    className="icon updateIcon"
    style={{
      border: '3px solid rgba(65, 105, 225,0.7)',
      color: 'rgba(65, 105, 225,0.7)',
      marginLeft: '10px',
      marginRight: '10px',
      transition: '0.3s all',
    }}
    onClick={handleUpdateClickOpen}
    aria-label="update"
    >
    <EditIcon />
  </IconButton>

    <IconButton
    onClick={handleDeleteClickOpen}
    className="icon deleteIcon"
    style={{
      border: '3px solid rgba(255, 99, 71,0.7)',
      color: 'rgba(255, 99, 71,0.7)',
      transition: '0.3s all',
    }}
    size='medium'
      aria-label="delete"
      
    >
      <DeleteIcon />
    </IconButton>
    {/* delete dialog  */}
    <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
          <DialogTitle id="alert-dialog-title">{"Are you sure to delete this task?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {todo.title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Disagree</Button>
            <Button onClick={handleConfirmDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      {/* Update Todo Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
          <DialogTitle id="update-dialog-title">{"Update Todo"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              name="title"
              value={updatedTodo.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              name="description"
              value={updatedTodo.description}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose}>Cancel</Button>
            <Button onClick={handleSaveUpdate} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    </div>
</ListItem>
  );
};

export default Todo;
