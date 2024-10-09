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

  const handleDelete = (id) => {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => getList())
      .catch((error) => console.log("Error deleting task.", error));
  }

  const handleEdit = (id) => {
    const updatedTodo = { title: editingText };
    fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(() => {
        setEditingTodo(null);
        setEditingText("");
        getList();
      })
      .catch((error) => console.log("Error editing task.", error));
  }

  const handleSave = (id) => {
    if (editingTodo) {
      handleEdit(id);
    }
  }

  const renderItem = () => {
    const newItem = todoList;
    return newItem.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          {item.title}
          <span>
          {editingTodo === item.id ? (
            <input 
              type="text" 
              value={editingText} 
              onChange={(e) => setEditingText(e.target.value)} 
              className='form-control'
            />
          ) : (
            <input type="text" value={item.title} className='form-control' readOnly />
          )}
          {editingTodo === item.id ? (
            <button className="btn btn-primary mr-2" onClick={() => handleSave(item.id)}>Save</button>
          ) : (
            <button className="btn btn-secondary mr-2" onClick={() => setEditingTodo(item.id)}>Edit</button>
          )}
          <button className="btn btn-danger mr-2" onClick={() => handleDelete(item.id)}>Delete</button>
        </span>
      </li>
    ));
  };

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
  }; 

  return (

    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
            <button className="btn btn-primary" onClick={handleAdd}>Add Task</button>
              <ul className="list-group list-group-flush border-top-0">
                {renderItem()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App
