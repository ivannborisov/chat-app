const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');




router.get('/', (req, res) => {
    res.send('server is up and running')
});

router.post('/users', userController.createUser );
router.post('/users/login', userController.login );


router.get('/users/auth', auth, (req, res) => {
    res.send({success: true, message: 'Authorized'});
})

module.exports = router;