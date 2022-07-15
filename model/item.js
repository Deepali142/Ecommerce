const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:'string',
        required:true,
    },
    image:{
        type:'string',
        required:true
    },
    category:{
        type:'string',
        required:true,
    },
    isDelete:{
        type:Boolean,
    }
},{
    timestamps:true,
}
);

const items = new mongoose.model('Item',Schema);

module.exports = items;