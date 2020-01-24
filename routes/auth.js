const router = require('express').Router();
const User = require('../models/User')
const {
  registerValidation,
  loginValidation,
} = require('./validation')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
  verify,
  genToken
} = require('./verifyToken')
//Validate
const Joi = require('@hapi/joi');



const buildAuthResponse = (user) => {
  const userData = {
    id: user._id,
    email: user.email,
    username: user.username,
  };
  const token = genToken(userData);
  return {
    user: userData,
    token,
  };
};

////Get Users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})


///Register
router.post('/register', async (req, res, next) => {
  const {
    error
  } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const emailExists = await User.findOne({
    email: req.body.email
  })
  if (emailExists) return res.status(400).send("Email already exists")

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    })
    const respData = buildAuthResponse(user)
    user.save()
    res.json(respData)
  } catch (err) {
    next(err)
  }
})


////Login
router.post('/login', async (req, res) => {
  const {
    error
  } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({
    email: req.body.email
  })
 
  if (!user.email) return res.status(400).send("Email is incorrect")

  if (await bcrypt.compare(req.body.password, user.password)) {
    const respData = buildAuthResponse(user);
    res.json(respData)
  } else if (!validPass) {
    return res.status(400).send('Invalid Password')
  }

  // const token = jwt.sign({
  //   _id: user._id,
  //   username: user.username
  // }, process.env.TOKEN_SECRET);
  // res.header('authToken', token).send({user,token})

})

///Verify
router.get('/verify',verify, (req, res) => {
  const user = res.locals.user;
  res.json(user);
  // const token = jwt.sign({
  //   _id: user._id
  // }, process.env.TOKEN_SECRET);
  // res.header('auth-token', token).send({
  //   token
  // })
});



module.exports = router;
module.exports.buildAuthResponse = buildAuthResponse;