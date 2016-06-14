var mongoose = require('mongoose');

var projectAcl = mongoose.model('projectAcl', new mongoose.Schema({},{strict : false}), 'projectAcl');

module.exports = { ProjectAcl : projectAcl};
