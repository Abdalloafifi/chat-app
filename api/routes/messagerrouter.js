var express = require('express');
var router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifytoken');

const { getAllUsers,getAllFriends , getMessages, sendMessage, likeMessage,ConfirmOrder,addFriends,deleteMessage,getUsers,getConfirmFriends } = require('../controllers/messageControler');
const upload = require('../middlewares/uplod');


router.get('/allusers', verifyToken, getAllUsers);
router.get('/friends', verifyToken, getAllFriends);
router.get('/users', verifyToken, getUsers);
router.post('/addFriends', verifyToken, addFriends);
router.get('/confirmFriends', verifyToken, getConfirmFriends);
router.post('/confirmOrder', verifyToken, ConfirmOrder);
router.get('/messages/:id', verifyToken, getMessages);
router.post('/sendmessage/:id', verifyToken, upload.single('file'), sendMessage);
router.put('/like/:id', verifyToken, likeMessage);
router.delete('/delete/:id', verifyToken, deleteMessage);


module.exports = router;
