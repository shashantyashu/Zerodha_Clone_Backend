// const User = require("../model/UsersModel");
const { UsersModel } = require("../model/UsersModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// module.exports.userVerification = (req, res) => {
//   const token = req.cookies.token
//   if (!token) {
//     return res.json({ status: false })
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//      return res.json({ status: false })
//     } else {
//       const user = await UsersModel.findById(data.id)
//       if (user) return res.json({ status: true, user: user.username })
//       else return res.json({ status: false })
//     }
//   })
// }

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);
  console.log("Body:", req.body);
  console.log("req.headers:", authHeader);
  const token = authHeader.split(" ")[1]; //authHeader &&
  console.log(token);
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // req.user = decoded;
    // next();
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.json(token);
      } else {
        const user = await UsersModel.findById(data.id);
        if (user) return res.json({ status: true, user: user.username });
        else return res.json({ status: false });
      }
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// {
//   "email":"eva@gmail.com",
//   "password":"eva"
// }

//protected-route
