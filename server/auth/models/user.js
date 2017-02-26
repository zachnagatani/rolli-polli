const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      jwt = require('jsonwebtoken'),
      userSchema = new Schema({
          username: {type: String, required: true, index: {unique: true}},
          email: {type: String, required: true, index: {unique: true}},
          password: {type: String, required: true}
      }),
    //   secret = require('../../config/secret');
    secret = process.env.SECRET_PHRASE;

userSchema.methods.generateJwt = (username, id) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: id,
        username: username,
        exp: parseInt(expiry.getTime() / 1000)
    }, secret());
};

module.exports = mongoose.model('User', userSchema);