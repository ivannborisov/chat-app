const userService = require('../services/user')

const createUser = async (req, res) => {
    const reqBody = req.body;
    console.log(reqBody)
    const user = await userService.createUser(reqBody);

    res.json(user);

}

const login = async (req, res) => {

    try {
        const {username, password } = req.body;
        console.log(req.body)
        const {user, token} = await userService.login({username, password});
        
        res.json({user, token, success: true});
    }   
    catch (error) {
        console.log(error);
        res.status(400).json({success:false, error: error.message});
    }
} 

module.exports = {createUser, login};