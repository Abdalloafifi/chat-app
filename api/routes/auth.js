var express = require('express');
var router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifytoken');
const { register, login, viledLogin, deleteUser ,logout} = require('../controllers/authcontroller');
 
router.post('/register', register);
router.post('/login', login);
router.post('/viledLogin',verifyToken,viledLogin);
//logout router
router.post('/logout', logout);
//delete user router
router.post('/deleteUser',verifyToken, deleteUser);



module.exports = router;
