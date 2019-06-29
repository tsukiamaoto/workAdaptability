const createError = require('http-errors');
const express = require('express');
const path = require('path');
const iconv = require('iconv-lite');
const { spawn } = require('child_process');
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser')
const resumesRouter = require('./controller/resume');
const usersRouter = require('./controller/users');
const jobsRouter = require('./controller/job');
const convertapi = require('convertapi')('0Jh8kqHOT04ytSMl');
const Multer = require('multer');
const mongoose = require('mongoose');
const hash = crypto.createHash('sha256');
const app = express();

const User = require('./models/user');
const Interest = require('./models/Interest');
const Resume = require('./models/resume');

require('dotenv').config();
app.use(cors())

mongoose.connect(process.env.mongoDB,{useNewUrlParser : true, useFindAndModify: false});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./public/uploads/pdf');
  },
  filename: (req, file, cb) => {
    const filename = crypto.createHash('md5').update(file.originalname + Date.now()).digest('hex');
    cb(null, filename + '.pdf') //Appending .jpg
  }
});
const multer = Multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
  storage: storage
});

// Uploads file to DB
app.post('/resume/upload',/*multer.any(),*/ (req, res,next) => {
  const path = './public/autobiography/' + req.body.file +'.pdf'
  // if (!req.files) {
  //   return next();
  // }

  // pdf convert to txt
  convertapi.convert('txt', {
    // File: path + req.files[0].filename,
    File: path
  }, 'pdf').then(function (result) {
    result.saveFiles('./public/uploads/out.txt');
    console.log('transfer finished')

    file = ['executeIntererstResult.py','executeOfJobRecommend.py']
    file_path = './smart-recommend/'

    // use smart-recommend to calculate autobiography to get weight, interest, recommend_jobs
    console.log('smart-recommend start');
    const runInterestPy = new Promise(function(success, nosuccess) {
      const pyprog = spawn('python', [ file_path + file[0]])

      pyprog.stdout.on('data', function(data) {
        const results = JSON.parse(iconv.decode(data,'Big5'));
        success(results)
      });
      pyprog.stderr.on('data', function(data) {
        console.log(data.toString())
      });
      pyprog.on('close', function(code) {
        console.log('轉換完成!')
      });
    });
    const runJobPy = new Promise(function(success, nosuccess) {
      const pyprog = spawn('python', [ file_path + file[1]])

      pyprog.stdout.on('data', function(data) {
        const results = JSON.parse(iconv.decode(data,'Big5'));
        success(results)
      });
      pyprog.stderr.on('data', function(data) {
        console.log(data.toString())
      });
      pyprog.on('close', function(code) {
        console.log('轉換完成!')
      });
    });

    Promise.all([runInterestPy,runJobPy]).then(values =>{
      const [interest,job] = values
      const interest1 = {
        artistic: interest.weight[0],
        conventional: interest.weight[1],
        enterprising: interest.weight[2],
        investigative: interest.weight[3],
        realistic: interest.weight[4],
        social: interest.weight[5]
      }
      const resume1 = new Resume({
        // autobiography: req.files[0].filename,
        autobiography: req.body.file,
        interest_symbol: interest.interest_symbol,
        hobbies: interest.user_hobby,
        skills: job.skills,
        recommend_jobs: job.recommend_jobs
      })

      // save interest, jobs, weight to DB
      Interest.create(interest1,function(err, interest){
        resume1.interest = interest.id;
        resume1.save().then(resume => {
          try {
            User.findOneAndUpdate(req.body.user,{$set:{resume: mongoose.Types.ObjectId(resume.id)}},{new: true})
              .populate({ path: 'resume', model: Resume,
                populate: {
                  path: 'interest', model: Interest
                }
              })
              .exec((err, doc) => {
                res.json({ resume: doc.resume })
              })
          }catch(err){
            console.log(err)
          }
        })
      })
    });
  }).catch(err => {res.json({err:err})});
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // console.log(file)
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream({ filename: file.filename});
      readstream.on('open', (file) => {
        console.log(file)
      })
      //error handling, e.g. file does not exist
      readstream.on('error', (err) => {
        console.log('An error occurred!', err);
        throw err;
      });
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// route url
app.use('/user', usersRouter);
app.use('/job', jobsRouter);
app.use('/resume', resumesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.port || 7020
app.listen(port, () => console.log(`server started on port:${port}`));
module.exports = app;
