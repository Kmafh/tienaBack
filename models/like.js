const {Schema, model} = require('mongoose')

const LikeSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default:true
    },
})


LikeSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Like', LikeSchema);