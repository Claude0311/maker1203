var mongoose = require('./db'),
    Schema = mongoose.Schema;

var Job_Schema = new Schema({
    ID : String,
	control : {type:Number, default:50}
})

module.exports = mongoose.model('hand',Job_Schema);