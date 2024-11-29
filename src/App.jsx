import React from "react";
import { TodoProvider } from "./context/todoContext"; 
import Todos from "./components/Todos";

function App() {
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default App;
