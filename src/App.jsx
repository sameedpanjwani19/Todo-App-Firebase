import React, { useState } from "react";
import { firebaseApp } from "./config/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const db = getFirestore(firebaseApp);
  const [todo, setTodo] = useState([]);
  const input = React.useRef();

  const addTodo = async (event) => {
    event.preventDefault();
    const inputValue = input.current.value.trim();

  
    if (!inputValue) {
      alert("Please enter a todo.");
      return; 
    }

    todo.push(inputValue);
    setTodo([...todo]);

    // Firebase 
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: inputValue,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    input.current.value = ""; 
  };

  const editTodo = (index) => {
    const editVal = prompt("Enter value");
    if (editVal && editVal.trim()) {
      todo.splice(index, 1, editVal.trim());
      setTodo([...todo]);
    }
  };

  const delTodo = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <form className="d-flex justify-content-center mb-4" onSubmit={addTodo}>
        <input
          ref={input}
          type="text"
          className="form-control w-50 me-2"
          placeholder="Add a new todo"
        />
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
      
      <div className="todo-list">
        <ul className="list-group">
          {todo.map((item, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center list-group-item mb-2">
              <li className="flex-grow-1">{item}</li>
              <div className="btn-group">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editTodo(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => delTodo(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
