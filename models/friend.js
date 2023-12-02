const {Schema, model} = require('mongoose')

const FriendSchema = Schema({
    img: {
        type: String,
    },
    uid: {
        type: String,
        required: true
    },
    fid: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    
})


FriendSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Friend', FriendSchema);