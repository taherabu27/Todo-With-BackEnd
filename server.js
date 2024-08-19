require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
// const Todo = require('Todo');
// const { Schema } = require('mongoose');


app.use(bodyParser.json());

connectDB();

//? routes
app.use ('/api/todo', require('./routes/api/todos')) // if i add "api/todo" it was giving error???

// app.use('/api/users', require('./routes/api/users'))



//? Get data

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our TODO List App' })
})

// let Todo = [{
//     id: '',
//     title: String,
//     description: String,

// }];

let todos = [];
let todoId = 0;

//? Create Todo List

app.post('/todos', (req, res) => {
    const todo = req.body
    todo.id = ++todoId;
    // todo = {
    //     title: req.body.title,
    //     description: req.body.description
    // }
    todos.push(todo);
    res.status(201).json(todo)
});


//? Get all the todo list
app.get('/todos', (req, res) => {
    res.json(todos);
});


//? Get a Specific Todo List
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const todo = todos.find((todoId) => todoId.id === id)
    if (todo) {
        res.json(todo)
    } else {
        res.status(404).json({ message: 'Todo list not found' })
    }
})


//? Update Todo List
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updaetTodo = req.body
    const todoIndex = todos.findIndex((todoId) => todoId.id === id)
    if (todoIndex === -1) {
        res.status(404).json({ message: 'Todo list not found' })
    } else {
        todos[todoIndex] = {
            ...todos[todoIndex], ...updaetTodo
        }
        res.json(todos[todoIndex])
    }
})

//? Delete  Data
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const todoIndex = todos.findIndex((todoId) => todoId.id === id)
    if (todoIndex === -1) {
        res.status(404).json({ message: 'Todo list item not found' })
    } else {
        todos.splice(todoIndex, 1)
        res.json({ message: 'Todo List Deleted successfully' })
    }
})


//? Create Data
// app.post('/todos', async (req, res) => {
//     try {
//         const todo = new Todo({
//            title: req.body.title,
//            description: req.body.description,

//         });
//         const saveTodo = await todo.save();

//         res.status(201).json(saveTodo);
//     }
//     catch (error) {
//         res.status(404).json({ message: error.message });
//     }

// });




//? Create a port...
const port = process.env.PORT || 7009;

//? Start the Server
app.listen(port, () => {
    console.log(`Server is running at ${port} http://localhost:7009`);
})