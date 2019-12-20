var mongoose = require('./database'),
    Schema = mongoose.Schema;

var Job_Schema = new Schema({
    ID : String,
	control : {type:Number, default:50},
	message : String
})

module.exports = mongoose.model('hand',Job_Schema);