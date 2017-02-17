const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      jwt = require('jsonwebtoken'),
      userSchema = new Schema({
          username: {type: String, required: true, index: {unique: true}},
          email: {type: String, required: true, index: {unique: true}},
          password: {type: String, required: true}
      }),
      secret = require('../../config/secret');

userSchema.methods.generateJwt = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000)
    }, secret());
};

module.exports = mongoose.model('User', userSchema);