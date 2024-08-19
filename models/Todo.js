const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = Todo = mongoose.model('Todo', TodoSchema);
