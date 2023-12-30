const {Schema, model} = require('mongoose')

const FollowSchema = Schema({
    uid: {
        type: String,
        required: true
    },
    aid: {
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
    active:{
        type: Boolean,
        default:true
    }
})


FollowSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;

})

module.exports = model( 'Follow', FollowSchema);