const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
    },
    createAt: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true,
        default: true

    },
    uid:{
        type: String,
    },
    uName:{
        type: String,
    },
    description:{
        type: String,
    },
    img:{
        type: String,
    },
    
    provincia:{
        type: String,
    }
})


ProductSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Product', ProductSchema);