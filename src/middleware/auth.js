const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization").replace("Bearer ", "");
    const token = req.cookies.token;
    // console.log(token)
    if(!token){
      throw new Error();
    }
    // console.log(token); //remove
    const decoded = jwt.verify(token, "alwayslookonthebrightside");
    // console.log(decoded._id); //remove
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
