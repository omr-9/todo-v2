import React, { useContext, useRef, useEffect, useState } from "react";
import { List } from "@mui/material";
import TodoItem from "./Todo";
import TodoContext from "../context/todoContext";

const TodoList = () => {
  const { todoToBeRendered, toggleComplete, handleDeleteTodo, handleUpdateTodo } = useContext(TodoContext);
  const listRef = useRef(null);
  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setListHeight(listRef.current.scrollHeight); 
    }
  }, [todoToBeRendered]);  

  return (
    <List
    className="list"
      ref={listRef}
      style={{
        maxHeight: listHeight > 200 ? '200px' : 'auto', 
        overflowY: listHeight > 200 ? 'scroll' : 'hidden', 
      }}
    >
      {todoToBeRendered.map((todo) => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          handleDeleteTodo={handleDeleteTodo}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
    </List>
  );
};

export default TodoList;
