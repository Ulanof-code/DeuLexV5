const express = require('express');
const { loginController ,registerController, currentUserController } = require("../controllers/users");
const { auth } = require("../middleware/auth");
const router = express.Router();

/* api/user/login */
router.post('/login', loginController);

/* api/user/register */
router.post('/register', registerController);

/* ali/user/current */
router.get('/current', auth, currentUserController);
 
module.exports = router;
