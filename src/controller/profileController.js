const profileModel = require('../models/profileModel')
const jwt = require('jsonwebtoken');
exports.createProfile = (req,res)=>{
    const reqBody = req.body;
    profileModel.create(reqBody,(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error})
        } else {
            res.status(200).json({status:"success",data:data})
        }
    })

}
exports.loginProfile = (req,res)=>{
    const userName = req.body['userName'];
    const password = req.body['password'];
    profileModel.find({userName:userName,password:password},(error,data)=>{
        if(error){
            res.status(400).json({status:"fail",data:error});
        }
        else{
           if (data.length>0) {

               const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: data[0]
              }
              const token = jwt.sign(payload, 'secret123');

            res.status(200).send({status:"success",token:token,data:data});

           } else {
            res.status(401).json({status:"unauthorize"});
           }
        }
    })

}

exports.readProfile = (req,res)=>{
    const userName = req.headers['userName'] ;

    profileModel.find({userName:userName},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}

exports.updateProfile = (req,res)=>{
    const userName = req.headers['userName'] ;
    const reqBody = req.body ;
    profileModel.updateOne({userName:userName},{$set:reqBody},{upsert:true},(error,data)=>{
        if (error) {
            res.status(400).json({status:"fail",data:error});
        } else {
            res.status(200).send({status:"success",data:data});
        }
    })
}