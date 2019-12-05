const userService = require('../services/user')

const createUser = async (req, res) => {
    try {
        const reqBody = req.body;
        const user = await userService.createUser(reqBody);

        res.json({success:true, user});

    }
    catch (error) {
        console.log(error);
        res.status(400).json({success:false, error: error.message});
    }

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