var express = require('express');
var router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifytoken');

const { getAllUsers, getMessages, sendMessage, likeMessage } = require('../controllers/messageControler');
const upload = require('../middlewares/uplod');


router.get('/allusers', verifyToken, getAllUsers);
router.get('/messages/:id', verifyToken, getMessages);
router.post('/sendmessage/:id', verifyToken, upload.single('file'), sendMessage);
router.put('/like/:id', verifyToken, likeMessage);


module.exports = router;
