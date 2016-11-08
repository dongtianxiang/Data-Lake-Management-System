var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
 
var AWS_ACCESS_KEY = 'AKIAJX37F5PCJI25NIIA';
var AWS_SECRET_KEY = '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';
var S3_BUCKET = 'cis550whereamazinghappens';
var aws = require('aws-sdk');

var db_validate = function(query, res) {
	MongoClient.connect("mongodb://52.22.212.86:27017/cis550", function(err, db) {
    assert.equal(err, null);
    var collection = db.collection("test");
    output_test(res, collection, query);	
	});
}

var output_test = function(res, collection, query) {
	collection.find({'USERNAME': query.username}).toArray(function(err,items) {
		if(items.length == 0) {
			res.redirect('/?error=user not found');
		} else {
			if(items[0].PASSWORD != query.password) {
				res.redirect('/?error=password is wrong');
			} else {
				  var r = [];
			      aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
				  var s3 = new aws.S3();
				  var s3_params = { 
						  Bucket: S3_BUCKET, 
				  }; 				  
				  s3.listObjects(s3_params, function (err, data) {
				    if (err) {
				      console.log('Could not load objects from S3');
				    } else {
				      console.log('Loaded ' + data.Contents.length + ' items from S3');
				      for (var i = 0; i < data.Contents.length; i++) {
				    	  r.push(data.Contents[i].Key);
				    	  console.log(data.Contents[i].Key);
				      }
				    }
					res.render('account.jade', {title: query.username, result: r});
				  });
			}
		}
	});
	
}

exports.do_work = function(req, res){
    console.log(req.body);
    db_validate(req.body, res);
//	  res.render('account.jade', { 
//		  title: ''
//	  });
//    console.log(req);
};