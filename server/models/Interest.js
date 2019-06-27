const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const interestSchema = new Schema({
  investigative: { type: Number },
  artistic: { type: Number },
  social: { type: Number },
  enterprising: { type: Number },
  realistic: { type: Number },
  conventional: { type: Number }
});

module.exports = mongoose.model('Interest', interestSchema);
