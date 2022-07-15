const mongoose = require('mongoose');
// const ObjectID = mongoose.Schema.Types.ObjectId
const Schema = new mongoose.Schema({
  
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    items:[{
        itemId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        },
    name:String,
    quantity:
    {
        type:Number,
        required:true,
        min:1,
        default:1},
        price:Number,
    }],
    bill:{
        type:Number,
        required:true,
        default:0
    }
},{
  timestamps:true,   
  
}
);

const cart = new mongoose.model('Cart',Schema);
module.exports = cart;