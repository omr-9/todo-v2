import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TodoList from "./TodoList"; 
import TodoContext from "../context/todoContext"; 
import "../App.css";

function Todos() {
  const {
    todos,
    todoTitle,
    setTodoTitle,
    todoDesc,
    setTodoDesc,
    displayTodoType,
    handleChange,
    handleAddClick,
    todoToBeRendered,
    clearAllTodos,
  } = useContext(TodoContext);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const uncompletedCount = todos.filter((todo) => !todo.completed).length;
  const allCount = todos.length;

  return (
    <div className="body">
      <Container
        maxWidth="md"
        className="container"
        style={{
          margin: "75px auto",
          backgroundColor: "#393E46",
          color: "white",
          borderRadius: "6px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          maxWidth: "600px",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#393E46",
            padding: "40px 0 20px 0",
            position: "sticky",
            top: "0",
            maxWidth: "100%",
            overflowY: "hidden",
            zIndex: "10",
          }}
        >
          <Typography variant="h3" gutterBottom align="center">
            To-Do List
          </Typography>
          <hr style={{ borderRadius: "50%", margin: "30px" }} />
          <Box
            margin={"0px"}
            borderRadius={'4px'}
            sx={{ bgcolor: "#cfe8fc" }}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems="center"
            
          >
            <div
              className="main-div"
              style={{ padding: "12px", width: "100%", display: "flex",background:'#DDE6ED',borderRadius:'6px' }}
            >
              <TextField
                className="input-field"
                style={{ width: "40%" }}
                id="to-do-title"
                label="Add a New Todo"
                variant="standard"
                color="#DDE6ED"

                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
              <TextField
                className="input-field"
                style={{ margin: " 0 20px", width: "40%" }}
                id="desc"
                label="Add a Description"
                color="#DDE6ED"
                value={todoDesc}

                variant="standard"
                onChange={(e) => setTodoDesc(e.target.value)}
              />
              <Button
                size="large"
                className="add-btn"
                variant="contained"
                onClick={handleAddClick}
                style={{ width: "20%",backgroundColor:'#3B1C32' }}
              >
                Add
              </Button>
            </div>
          </Box>

          <ToggleButtonGroup
        
            className="toggle-btn-group"
            color="standard"
            value={displayTodoType}
            exclusive
            onChange={handleChange}
            size="small"
            aria-label="Platform"
            
            style={{ marginTop: "30px", backgroundColor: "white" }}
          >
            <ToggleButton
              className="toggle-btn"
              value="all"
              style={{ display: "flex" }}
             
            >
              All({allCount})
            </ToggleButton>
            <ToggleButton className="toggle-btn" value="completed" >
              Completed({completedCount})
            </ToggleButton>
            <ToggleButton className="toggle-btn" value="uncompleted">
              UnCompleted({uncompletedCount})
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Todo List Rendering */}
        <div>

        {todos && todos.length > 0 ? (
          <TodoList todos={todoToBeRendered} />
        ) : (
          <div style={{ paddingBottom: "40px" }}>
            <h1>Nothing !!</h1>
            <h3>Your {displayTodoType} list is empty</h3>
          </div>
        )}
        </div>
      </Container>
    </div>
  );
}

export default Todos;
