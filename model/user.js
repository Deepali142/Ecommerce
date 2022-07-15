const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:'string',
        required:true,
        trim:true,
    },
    email:{
        type:'string',
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:'string',
        required:true,
        trim:true,
    },
    token:{
        type: "String",
    },
    isDelete:{
        type:Boolean,
    }
},{
    timestamps:true,
})

userSchema.methods.joiValidate = (obj) =>{
    var Joi = require('joi');
    var schema = {
        name:Joi.types.String().min(6).max(12).required(),
        email:Joi.types.String().regex([/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]).required(),
        password:Joi.types.String().min(8).max(15).regex(/[a-zA-Z0-9]{3,30}/),
        token:Joi.types.String(),
    }
    return Joi.validate(obj,schema);
}

module.exports = mongoose.model('User',userSchema);