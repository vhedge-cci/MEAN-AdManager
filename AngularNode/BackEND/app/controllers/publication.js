var Publication = function()
{
	var async = require('async');
	var Publication = require('../models/publication').Publication;
	// this.params = {};
	// this.config = require('../config/config.js');
	// var self = this;

	//...Get all users
	this.getPublications = function(req, res){
		Publication.find({}).lean().exec(function(err, publications){
			//var ids = users.map( function(doc) { return doc._id } );
			return res.status(200).json({publications : publications});
		})
	};

	//..Get user based on ID
	this.getPublicationsByID = function(req, res){
		Publication.findOne({_id : req.params.id}).lean().exec(function(err, publication){
			return res.status(200).json({publication : publication});
		})
	};

	//..Update user based on ID
	this.updatePublicationByID = function(req, res){
		Publication.findOneAndUpdate({_id : req.params.id}, {$set: { publicationName: req.body.publicationName, publicationType : req.body.publicationType, publicationLanguage: req.body.publicationLanguage, commissionRateForAdvertisments : req.body.commissionRateForAdvertisments, commisionRateForClassifieds: req.body.commisionRateForClassifieds, isActiveRecord: req.body.isActiveRecord }}, {upsert:true, new: true}, function(err, doc){
			  if(err) return res.status(500).json(err);
			  return res.status(200).json({publication : doc});
		});
	};
}

module.exports.Publication = Publication;
