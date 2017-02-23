const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      pollSchema = new Schema({
        username: {type: String, required: true},
        voters: {type: Array},
        question: {type: String, required: true},
        options: [{
            name: {type: String, required: true},
            votes: {type: Number, default: 0}
        }]
      }, {
          timestamps: true
      });

module.exports = mongoose.model('Poll', pollSchema);