const router = require('express').Router();
const {handleRegisterUser,handleLoginUser, } = require('../controllers/auth.controller');



router.post('/register',handleRegisterUser);
router.post('/login',handleLoginUser);

module.exports = router;