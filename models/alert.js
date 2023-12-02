const {Schema, model} = require('mongoose')

const AlertSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    associationId: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
    },
    visto:{
        type: Boolean,
    }
})


AlertSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Alert', AlertSchema);