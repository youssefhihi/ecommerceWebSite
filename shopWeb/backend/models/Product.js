const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    SKU:{
        type: String,
        required: true,
        unique: true,        
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
         type: String,
         required: false
     },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
   
},{
    timestamps: true
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product