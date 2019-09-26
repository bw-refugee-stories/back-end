const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secret = require('../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  //see if there is a token
  //check if token is valid 
  //    => rehash header + payload + secret and check if match
  // ^ handled by library
  // extract something like user id or username or role or something important

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log('failed verify: ', err)
        res.status(401).json({
          message: 'not verified'
        })
      } else {
        //token is valid and not expired
        req.decodedToken = decodedToken
        console.log('verified: ', decodedToken)
        if (decodedToken.role != 'admin') {
          //user doesn't have admin access
          res.status(400).json({message: "Access Denied"})
        } else {
          //user is admin
          next()
        }
      }
    })
  } else {
    res.status(400).json({
      message: 'no token'
    })
  }
};
