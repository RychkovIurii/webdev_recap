import React, { useEffect, useState } from 'react'
import './style.css'

//Handle get todos (fetch, visualise, state)

//Handle add todo (from, update, post)

//Handle edit todo (select, put, update, editing state)

//Handle delete todo (select, delete, update)

//Handle complete todo (get, toggle)

const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.log("Error fetching data.", error));
  };

  return (

    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App
