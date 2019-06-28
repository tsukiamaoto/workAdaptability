var express = require('express');
const assert = require('assert');
var router = express.Router();

const User = require('../models/user')
const Resume = require('../models/resume');

// get resume by resumeId
router.get('/:resumeId', function(req, res) {
  const resumeId = req.params.resumeId;
  console.log('get resume');
  Resume.findById(resumeId)
    .populate('interest')
    .exec( function (err, resume) {
    if(!resume){
      console.log('could not find resume!')
      res.json({err:err})
    }
    else{
      console.log('get resume successfully!');
      res.json({ resume: resume });
    }
  });
});

// get a new resume
router.post('/', function(req, res) {
  const resume = { ...req.body};
  console.log('create new resume');
  User.create(resume, function(err) {
   assert.equal(null, err);
   console.log('create resume successfully!');
   res.json({ success: true });
  }).save();
});

// update resume infomation
router.put('/:resumeId', function(req, res) {
  const resumeId = req.params.resumeId;
  const resume = { ...req.body }
  console.log('update resume infomation')
  Product.findByIdAndUpdate(resumeId, resume, function(err) {
   assert.equal(null, err);
   console.log('update resume successfully!');
   res.json({ success: true });
  });
});

module.exports = router;
