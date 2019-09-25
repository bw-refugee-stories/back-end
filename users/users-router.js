const router = require("express").Router();
const bcrypt = require("bcryptjs");
const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

// https://refu-stories-api.herokuapp.com/users/register
// expects username, and password. will return username and authZ token
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // a jwt should be generated
      //   console.log(saved);
      const token = generateToken(saved);
      const username = saved.username
      res.status(201).json({username, token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// https://refu-stories-api.herokuapp.com/users/login
// expects username, and password. will return username and authZ token
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ username, token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// https://refu-stories-api.herokuapp.com/users/admin/login
// expects username to be admin, and password to be root. will return username and authZ token
router.post("/admin/login", (req, res) => {
  let { username, password } = req.body;

  if (username == "admin") {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (password == "root") {
          const token = generateToken(user);
          res.status(200).json({
            username,
            token
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// https://refu-stories-api.herokuapp.com/users/
// returns a list of users, mainly for dev stuff
router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "Error getting users", err})
    })
})

// https://refu-stories-api.herokuapp.com/users/:id
// returns a user by id
router.get('/:id', (req, res) => {
  let id = req.params.id

  Users.getById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: "Error getting user", err})
    })
})

function generateToken(user) {
  //header
  //body -> username, id , roles, expiration
  //verify signature -> a secret
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
