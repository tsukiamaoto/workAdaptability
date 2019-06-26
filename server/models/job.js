const mongoose = require('mongoose');
const paginatePlugin = require('./plugins/pagination');
const Schema = mongoose.Schema;
const jobSchema = new Schema({
  title: { type: String },
  company: { type: String },
  type: { type: String },
  career: [{ type: String }],
  salary: { type: String },
  experience: { type: String },
  education: { type: String },
  jobcontent: { type: String },
  image: { type: String },
  link: { type: String },
});

jobSchema.plugin(paginatePlugin);

module.exports = mongoose.model('Job', jobSchema);