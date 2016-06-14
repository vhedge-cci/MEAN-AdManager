var ProjectAcl = function()
{
	var async = require('async');
	var ProjectAcl = require('../models/projectAcl').ProjectAcl;

	this.getProject = function(req, res){
			var givenUserId = parseInt(req.params.id);
			var match = {
			    $match : {
			        $or : [{
			                "auditors.userId" : givenUserId
			            }, {
			                "colaborators.userId" : givenUserId
			            }
			        ]
			    }
			}

			var project = {
				$project: {
		          	projectId : 1,
		          	memory : 1,

		          	auditors: {
			            $filter: {
			               input: "$auditors",
			               as: "auditor",
			               cond: { $eq: [ "$$auditor.userId", givenUserId ] }
			            }
		          	},

		          	colaborators : {
			            $filter : {
			                input : "$colaborators",
			                as : "colaborator",
			                cond : {
			                    $eq : ["$$colaborator.userId", givenUserId]
			                }
			            }
		         	}

		        }
			}

			var group = {
			    $group : {
			        _id : givenUserId,
			        "auditor" : {
			            $addToSet : {
			                $cond : {
			                    if  : {
			                        $ne : ["$auditors", []]
			                    },
			                then : "$projectId",
			                else  : null
			            }
			        }
			    },
			    "colaborator" : {
			        $addToSet : {
			            $cond : {
			                if  : {
			                    $ne : ["$colaborators", []]
			                },
			            then : "$projectId",
			            else  : null
			        }
			    }
			}}}

			// ProjectAcl.aggregate([matchArraysByUser, filterArrysByUser, group], function(err, projects){
			// 	return res.status(200).json({projects : projects});
			// })

			ProjectAcl.aggregate([match, project, group], function(err, projects){
				return res.status(200).json({projects : projects});
			})

			// ProjectAcl.aggregate([matchArraysByUser, filterArrysByUser, group], function(err, projects){
			// 	return res.status(200).json({projects : projects, count : projects.length});
			// })
	};

	this.addTestData = function(req, res){
		//return res.status(200).json({"ds":"ssddsd"})

		for(i=3; i < 100000; i++){
			var data = {
				projectId : Math.floor(Math.random()* 10) + 1,
				memory : "my memory number "+i,
				auditors : [
					{
						userNAme : Math.random().toString(36).substring(5),
						userId : Math.floor(Math.random()* 10) + 1
					},
					{
						userNAme : Math.random().toString(36).substring(5),
						userId : Math.floor(Math.random()* 4) + 1
					}	
				],
				colaborators : [
					{
						userNAme : Math.random().toString(36).substring(5),
						userId : Math.floor(Math.random()* 4) + 1
					},
					{
						userNAme : Math.random().toString(36).substring(5),
						userId : Math.floor(Math.random()* 4) + 1
					}	
				]
			}

			//console.log(data)


			var newProjectAcl = ProjectAcl(data);
			newProjectAcl.save(function(err) {
			   //return res.status(200).json({publication : newProjectAcl}); 
			});
  		}

  		return res.status(200).json({"ds":"ssddsd"})

	};
}

module.exports.ProjectAcl = ProjectAcl;