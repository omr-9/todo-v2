import React, { createContext, useState, useMemo, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [displayTodoType, setDisplayTodoType] = useState("all");

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const unCompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const todoToBeRendered = useMemo(() => {
    if (displayTodoType === "completed") {
      return completedTodos;
    } else if (displayTodoType === "uncompleted") {
      return unCompletedTodos;
    } else {
      return todos;
    }
  }, [displayTodoType, completedTodos, unCompletedTodos, todos]);

  useEffect(() => {
    const todoInStorage = JSON.parse(localStorage.getItem("todos"));
    if (todoInStorage) {
      setTodos(todoInStorage);
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddClick = () => {
    if (todoTitle.trim() || (todoDesc.trim() && todoTitle.trim())) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          description: todoDesc,
          completed: false,
        },
      ]);
      setTodoTitle("");
      setTodoDesc("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
  };

  const handleChange = (event, newAlignment) => {
    setDisplayTodoType(newAlignment);
  };
  const clearAllTodos = () => {
    setTodos([])
  }

  return (
    <TodoContext.Provider value={{
      todos,
      setTodos,
      todoTitle,
      setTodoTitle,
      todoDesc,
      setTodoDesc,
      displayTodoType,
      setDisplayTodoType,
      handleAddClick,
      toggleComplete,
      handleDeleteTodo,
      handleUpdateTodo,
      handleChange,
      todoToBeRendered,
      clearAllTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
