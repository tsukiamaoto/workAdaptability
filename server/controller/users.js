var express = require('express');
const assert = require('assert');
var router = express.Router();

const User = require('../models/user');

router.get('/', function(req, res) {
  console.log('fetch user that has logged in');
  User.findOne({isLogin: true}, function(err, user) {
    if(!user) {
      console.log('not found the account has logged in')
      res.json({ err: 'not found any the account has logged in'})
    } else {
      console.log('find the account has logged in');
      res.json({ user: user})
    }
  });

});

// login account
router.post('/login', function(req, res) {
  const login = {
    account: req.body.account,
    password: req.body.password
  }
  console.log('user login');
  User.findOneAndUpdate(login,{$set: { isLogin: true }}, function(err, user) {
   if (!user) {
      // if not found account
      console.log('the account is not exist!');
      res.json({err: 'the account is not exist!'})
   }
   else {
      console.log('login record successfully!');
      res.json({ success: true });
   }
  });
 });

// logout account
router.post('/logout', function(req, res) {
  const logout = {
    account: req.body.account,
    password: req.body.password
  }
  console.log('user logout')
  User.findOneAndUpdate(logout,{$set: { isLogin: false }}, {new: true} , function(err, user) {
    if (!user) {
      // if not found account
      console.log('the account is not exist!');
      res.json({err: 'the account is not exist!'})
    }
    else {
      console.log('logout record successfully!');
      res.json({ success: true });
    }
  });
});

// resgiter a new account
router.post('/register', function(req, res) {
  const register = { ...req.body};
  const account = {
    account: req.body.account,
    password: req.body.password
  }
  console.log('create user register');
  User.findOne(account, (err,user) => {
    if(!user) {
      User.create(register, function(err, user) {
       console.log('register record successfully!');
       res.json({ success: true });
      });
    }
    else {
      console.log('the account is existed!');
      res.json({ err: 'the account is existed!'})
    }
  })
});

// get user infomation
router.get('/:userId', function(req, res) {
  const userId = req.params.userId;
  console.log('get user infomation');
  Product.findById(userId, function(err, user) {
   assert.equal(null, err);
   console.log('get user information successfully!');
   res.json({ user: user });
  });
});

// update user infomation
router.put('/:userId', function(req, res) {
  const userId = req.params.userId;
  const user = { ...req.body }
  console.log('update user infomation')
  Product.findByIdAndUpdate(userId, user, function(err) {
   assert.equal(null, err);
   console.log('update user infomation successfully!');
   res.json({ success: true });
  });
});

module.exports = router;
