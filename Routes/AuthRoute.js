const { Signup, Login } = require("../Controllers/AuthController");
const { verifyToken } = require("../Middlewares/AuthMiddleware") //userVerification
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',verifyToken)  //userVerification

module.exports = router;