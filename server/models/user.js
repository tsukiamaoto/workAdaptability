const mongoose = require('mongoose');
const paginatePlugin = require('./plugins/pagination');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    account: { type: String },
    password: { type: String },
    avatar: { type: String },
    email: { type : String },
    name: { type: String },
    phone: { type: String },
    telphone: { type: String },
    birth: { type: String },
    education: { type: String },
    address: { type: String },
    resume: { type: Schema.Types.ObjectId, ref: 'Resume' },
    isLogin: { type: Boolean, default: false }
});
userSchema.plugin(paginatePlugin);

module.exports = mongoose.model('User',userSchema);
