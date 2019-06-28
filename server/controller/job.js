const express = require('express');
const assert = require('assert');
const router = express.Router();

const Job = require('../models/job');
const helper = require('./helper');

// get all job
router.get('/', function(req,res) {
  console.log('get all job');
  const page = req.query.page;
  Job.paginate({page: page}, (err,pages) => {
    Job.find({})
      .limit(pages.limit)
      .skip(pages.skip)
      .exec((err, jobs) => {
        res.json({
          jobs: jobs,
          pages: pages
        })
      })
  })
});

// get one job
router.get('/:jobId', function(req,res) {
  const jobId = req.params.jobId;
  console.log('get one job by jobId');
  Job.findById(jobId, function(err, job) {
    console.log('get data from mongoDB successfully');
    res.json({ jobs: job });
  });
});

// search job
router.post('/',function(req,res) {
  console.log('search jobs by title or types');
  const queries = req.body.q || '';
  try{
  const title = helper.titleIsArray(queries)
  const career = helper.careerIsArray(queries)
  const page = req.query.page;
  Job.paginate({page: page}, (err,pages) => {
    Job.find({ $or: [
      { title: title },
      { career: career }
    ]})
      .limit(pages.limit)
      .skip(pages.skip)
      .exec((err, jobs) => {
        if(jobs){
          res.json({
            jobs: jobs,
            pages: pages
          })
        }
        else {
          console.log(err)
          res.json({
            err: err
          })
        }
      })
  })
  }catch(err){
    console.log(err)
  }
});


module.exports = router;
