const todoModel = require('../models/todoModel')
exports.createTodo = (req, res) => {
    const userName = req.headers['userName'] ;

    const todoSubject = req.body['todoSubject'];
    const todoDesctription = req.body['todoDesctription'];
    const todoCreateDate = Date.now();
    const todoUpdateDate = Date.now();
    const todoStatus = 'new';

    const postBody = {
        userName: userName,
        todoSubject: todoSubject,
        todoDesctription: todoDesctription,
        todoCreateDate: todoCreateDate,
        todoUpdateDate: todoUpdateDate,
        todoStatus: todoStatus
    }
    todoModel.create(postBody,(error,data)=>{
        if (error) {
            res.status(401).json({status:"fail",data:error})
        } else {
            res.status(201).json({status:"success",data:data})
        }
    })
}
exports.readTodo = (req,res)=>{
    const userName = req.headers['userName'] ;

    todoModel.find({userName:userName},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.updateTodo = (req,res)=>{
    const todoSubject = req.body['todoSubject'] ;
    const todoDesctription = req.body['todoDesctription'] ;
    const todoUpdateDate = Date.now();
    const id = req.body['id'] ;

    const postBody = {
        todoSubject :todoSubject,
        todoDesctription : todoDesctription ,
        todoUpdateDate :todoUpdateDate
    }

    todoModel.updateOne({_id:id},{$set:postBody},{upsert:true},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.updateTodoStatus = (req,res)=>{
    console.log(req.body);
    const todoStatus = req.body['todoStatus'] ;
    const todoUpdateDate = Date.now();
    const id = req.body['id'] ;

    const postBody = {
        todoStatus :todoStatus,
        todoUpdateDate :todoUpdateDate
    }

    todoModel.updateOne({_id:id},{$set:postBody},{upsert:true},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.removeTodoItem = (req,res)=>{
    const id = req.body['id'] ;
    todoModel.remove({_id:id},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.selectTodoByStatus = (req,res)=>{
    const userName = req.headers['userName'] 
    const todoStatus = req.body['todoStatus']
    todoModel.find({userName:userName ,todoStatus:todoStatus },(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.selectTodoByDate = (req,res)=>{
    const userName = req.headers['userName'] 
    const fromDate = req.body['fromDate']
    const toDate = req.body['toDate']

    todoModel.find({userName:userName,todoCreateDate:{$gte:new Date(fromDate),$lte:new Date(toDate)} },(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}