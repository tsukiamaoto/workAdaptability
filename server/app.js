const createError = require('http-errors');
const express = require('express');
const path = require('path');
const iconv = require('iconv-lite');
const { spawn } = require('child_process');
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser')
const request = require('request');
const resumesRouter = require('./controller/resume');
const usersRouter = require('./controller/users');
const jobsRouter = require('./controller/job');
var convertapi = require('convertapi')('CfYGjErF2UtaiBn7');
const Multer = require('multer');
const mongoose = require('mongoose');
const hash = crypto.createHash('sha256');
const app = express();

const User = require('./models/user');


require('dotenv').config();
app.use(cors())

mongoose.connect(process.env.mongoDB,{useNewUrlParser : true, useFindAndModify: false});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

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


// @route POST /upload
// @desc  Uploads file to DB
app.post('/resume/upload', multer.any(), (req, res,next) => {
  const path = './public/uploads/pdf/'
  if (!req.files) {
    return next();
  }

  convertapi.convert('txt', {
    File: path + req.files[0].filename,
  }, 'pdf').then(function (result) {
    result.saveFiles('./public/uploads/out.txt');
    console.log('transfer finished')

    file = ['executeIntererstResult.py','executeOfJobRecommend.py']
    file_path = './smart-recommend/'

    console.log('smart-recommend start');
    const runInterestPy = new Promise(function(success, nosuccess) {
      const pyprog = spawn('python', [ file_path + file[0]])
      pyprog.stdout.on('data', function(data) {
        const results = JSON.parse(iconv.decode(data,'Big5'));
        console.log(results)
        // success(results)
        // const userData = { $push:{
        //   "interest_symbol": temp.interest_symbol,
        //   "hobby": temp.user_hobby,
        //   "weight": temp.weight
        // }}

        // User.findOneAndUpdate( { isLogin:true }, userData, (err, user) => {
        //   console.log('success')
        // })

      });
      pyprog.stderr.on('data', function(data) {
        console.log(data.toString())
      });
      pyprog.on('close', function(code) {
        console.log('轉換完成!')
      })
    });
    const runJobPy = new Promise(function(success, nosuccess) {
      const pyprog = spawn('python', [ file_path + file[1]])
      pyprog.stdout.on('data', function(data) {
        const results = iconv.decode(data,'Big5').replace('/(\r)|(\n)/',''); // remove space, tab, \n
        console.log(1,results[0],results[1],2,results)
        
        //console.log(results[0],result[1])
        // const userData = { $push:{
        //   "skills": temp2.skills,
        //   "recommend_jobs": temp2.recommend_jobs
        // }}
        // User.findByIdAndUpdate({isLogin:true},userData,(err) =>{
        //   console.log('success')
        // })
      });
      pyprog.stderr.on('data', function(data) {
        console.log(data.toString())
      });
      pyprog.on('close', function(code) {
        console.log('轉換完成!')
      })
    });

    Promise.all([runInterestPy,runJobPy])
      // const results = await values.map(async value => { 
      //   const res = await JSON.stringify(value)
      //   return res
      // })
      // const results = await JSON.stringify(values[0])
      

    res.json({success: true})
  }).catch(err => {res.json({err:err})});
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    } else {
      files.map(file => {
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/gif') file.isImage = true;
        else file.isImage = false;
      })
    }
    res.json({files: files})
  });
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

// @route GET /files/:filename
// @desc  Display single file object
app.get('/resume/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json({file: file});
  });
});

// route url
app.use('/user', usersRouter);
app.use('/job', jobsRouter);
// app.use('/resume', resumesRouter);
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
  res.render('error');
});

const port = process.env.port || 7020
app.listen(port, () => console.log(`server started on port:${port}`));
module.exports = app;
