var express = require('express');
var router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require('../middlewares/verifytoken');
const {  getUserProfile, updateUserProfile, updateUserAvatar,isokUser } = require('../controllers/profileUser');
const upload = require('../middlewares/uplod');
 
router.get('/profile/:id', verifyToken, getUserProfile);
router.put('/profile/put/:id', verifyTokenAndAuthorization, updateUserProfile);
router.put('/profile/avatar/:id', verifyTokenAndAuthorization, upload.single('avatarProfile'), updateUserAvatar);
router.put('/profile/isok', verifyToken, isokUser);


module.exports = router;
