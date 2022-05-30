const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todoSubject: { type: String },
    todoDesctription: { type: String },
    todoCreateDate: { type: Date },
    todoUpdateDate: { type: Date },
    todoStatus: { type: String },
    userName:{type:String}
})

const todoModel = mongoose.model('todoList', todoSchema);

module.exports = todoModel;