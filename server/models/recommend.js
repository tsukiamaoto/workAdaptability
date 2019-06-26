const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recommendSchema = new Schema({
  name: { type: String },
  weight: { type: Schema.Types.ObjectId, ref: 'Interest' }
});

module.exports = mongoose.model('Recommend',recommendSchema);