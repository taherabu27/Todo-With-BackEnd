const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');

//? Create a Todo List
router.post("/", async (req, res) => {
    const todoObj = {
        title: req.body.title,
        description: req.body.description
    }
    const todo = new Todo(todoObj)
    await todo.save()
    res.status(201).json(todo)
}
)

//? Get All todo List
router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find({})
        res.json(todo);
    } catch (error) {
        res.status(500).json({ messgae: 'Something Went Wrong' })
    }
})


//? Get One Sepcific Todo List
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);

        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ message: 'Todo List Not Found' })
        }
    } catch (error) {
        res.status(500).json({ messgae: 'Something Went Wrong' })
    }
})


//? Update Todo List
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const todoBody = req.body;
        const updateTodo = await Todo.findByIdAndUpdate(id, todoBody, {
            new: true,
        });

        if (updateTodo) {
            res.json(updateTodo);
        } else {
            res.status(404).json({ message: 'Todo List Not Found' });
        }
    } catch (error) {
        res.status(500).json({ messgae: 'Something Went Wrong' });
    }
})



//? Delete Todo List

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTodo = req.body
        const todo = await Todo.findByIdAndDelete(id)
        if (deleteTodo) {
            res.json({ message: 'Todo List Deleted' })
        } else {
            res.status(404).json({ message: 'Todo List Not Found' });
        }
    } catch (error) {
        res.status(500).json({ messgae: 'Something Went Wrong' });
    }
})


module.exports = router;