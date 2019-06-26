const express = require('express');
const assert = require('assert');
const router = express.Router();

const Job = require('../models/job');

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
  const query = req.body.q || '';
  const page = req.query.page;
  console.log(page)
  Job.paginate({page: page}, (err,pages) => {
    Job.find({ $or: [
      { title: { $regex: query, $options: 'i' } },
      { career: { $in: query } }
    ]})
      .limit(pages.limit)
      .skip(pages.skip)
      .exec((err, jobs) => {
        res.json({
          jobs: jobs,
          pages: pages
        })
      })
  })
  
  // Job.find({ $or: [
  //   { title: { $regex: query, $options: 'i' } },
  //   { career: { $in: query } }
  // ]})
  //   .skip((perPage * page) - perPage)
  //   .limit(perPage)
  //   .exec( function(err, jobs) {
  //     Job.countDocuments().exec( function(err, count) {
  //       console.log('get data from mongoDB successfully');
  //       res.json({
  //         jobs: jobs,
  //         currentPage: page,
  //         pages: count
  //       })
  //     });
  // });
});


module.exports = router;