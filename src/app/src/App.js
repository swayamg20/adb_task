import "./App.css";
import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

export function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to the backend API
    fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: todo }),
    })
      .then((response) => {
        console.log(response.json());
        response.json();
      })
      .then((data) => {
        // Handle the response from the backend
        console.log("TODO created:", data);
        // Clear the input field after successful submission
        setTodo("");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error creating TODO:", error);
      });
    window.location.reload(false);
  };

  useEffect(() => {
    // Fetch TODOs from the backend API
    fetch("http://localhost:8000/todos")
      .then((response) => response.json())
      .then((data) => {
        // Update the component's state with the retrieved TODOs
        setTodoList(data);
      })
      .catch((error) => {
        console.error("Error fetching TODOs:", error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        <li>Learn Docker</li>
        <li>Learn React</li>
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="todo">ToDo: </label>
            <input
              type="text"
              value={todo}
              onChange={handleInputChange}
              placeholder="enter text dss"
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <button>Add ToDo!</button>
          </div>
        </form>

        <div>
          <h1>List TODOs</h1>
          <p>
            {todoList.map((todo) => (
              <li key={todo.id}>{todo.description}</li>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
