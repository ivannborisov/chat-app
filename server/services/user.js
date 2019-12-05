const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async ({username, password}) => {
    const user = new User({
        username : username,
        password : await bcrypt.hash(password, 8)
    });

    await user.save();

    return user;
}

const login = async ({username, password}) => {
    const user = await User.findOne({ username});
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    const token = jwt.sign({_id: user._id, username: user.username}, 'Q@DAS@R#FASCZXCOasdqwuh12981234', {expiresIn: '1h'});

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return {user, token};
};


module.exports = {createUser, login }