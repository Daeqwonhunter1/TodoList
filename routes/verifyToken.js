const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const genToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET);
  return token
};

//good

const verify =  (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).send("Access Denied")
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    res.locals.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token')
  }

  // const token = req.header("authToken")
  // if(!token) return res.status(401).send('NO token')
  // try {
  //   const verified = jwt.verify(token, process.env.TOKEN_SECRET)
  //   req.user = verified
  //   next()
  // } catch (e) {
  //   res.status(400).send('Unauthorized');
  // }
}

module.exports = {
  // hashPassword,
  // checkPassword,
  genToken,
  verify,
  
}