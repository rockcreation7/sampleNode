 var mongoose = require('mongoose');

 var photoSchema = new mongoose.Schema({
     name: String,
     org_name: String,
     postid: String
 });

 module.exports = mongoose.model('photo', photoSchema);
