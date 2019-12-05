
const mongoose = require('mongoose');

const MONGODB_URL = `mongodb://chat:chat1234@ds257241.mlab.com:57241/chat` 

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

mongoose.connection.on('connected', err => {
    console.log(`Successfully connected to MongoDB server: ${MONGODB_URL}`);
});

mongoose.connection.on('error', err => {
    logError(err);
});

require('../models/User');