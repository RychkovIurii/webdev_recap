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

  const renderItem = () => {
    const newItem = todoList;
    return newItem.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          {item.title}
      </li>
    ));
  }

  const handleAdd = () => {
    const newTodo = { title: "New Task text" };
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then(() => getList())
      .catch((error) => console.log("Error adding task.", error));
  }

  return (

    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <ul className="list-group list-group-flush border-top-0">
                {renderItem()}
              </ul>
            </div>
            <button className="btn btn-primary" onClick={handleAdd}>Add Task</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App
