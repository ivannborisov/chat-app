const Message = require('../models/Message');

const addMessage = async ({text, username, room}) => {
    const message = new Message({
        username,
        room,
        text
    });

    await message.save();

    return message;
}

const getMessagesByRooom = async (room) => {
    const messages = await Message.find({ room});

    return messages;
}

module.exports = {addMessage, getMessagesByRooom}