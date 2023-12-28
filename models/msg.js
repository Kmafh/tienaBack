const {Schema, model} = require('mongoose')

const MsgSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    cuid: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
    },
    
    subject:{
        type: String,
    },
    body:{
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
})


MsgSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Msg', MsgSchema);