const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resumeSchema = new Schema({
  autobiography: { type : String },
  license: [{ type: String }],
  interest: { type: Schema.Types.ObjectId, ref: 'Interest' },
  interest_symbol: { type: String, default: '' },
  hobbies: [{ type: String }],
  skills: [{ type: String }],
  recommend_jobs: [{ type: String }]
});

module.exports = mongoose.model('Resume',resumeSchema);
