const express = require('express');
const fs = require('fs'); // Для работы с файлами
const app = express();
const port = 3002;

app.use(express.json());

let todoData = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));

function saveDataToFile() {
	fs.writeFileSync('./database.json', JSON.stringify(todoData, null, 2), 'utf-8');
}

app.get('/', (req, res) => { // GET all tasks
	res.send(todoData);
});

app.post('/', (req, res) => { // ADD new task
	const task = req.body.text;
	const newTodo = {
		"id": Date.now(), //only for development
		"text": task,
		"completed": false
	}
	todoData.push(newTodo);
	saveDataToFile();
	res.send(todoData);
});

app.delete('/delete/:id', (req, res) => { // DELETE task by id
	const toDoId = req.params.id;
	todoData = todoData.filter(todo => todo.id !== Number(toDoId));
	saveDataToFile();
	res.send(todoData);
});

app.put('/update/:id', (req, res) => { // UPDATE task by id
	const toDoId = parseInt(req.params.id);
	const updatedText = req.body.text;
	todoData = todoData.map(todo => {
		if (todo.id === toDoId) {
			todo.text = updatedText;
		}
		return todo;
	});
	saveDataToFile();
	res.send(todoData);
});


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

