const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    text: {type: String },
    username: {type: String, required: true},
    room: {type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;