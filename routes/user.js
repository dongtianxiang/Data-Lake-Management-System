
/*
 * GET users listing.
 */

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var reg = /^[A-Za-z0-9]+$/;
 
var db_validate = function(query, res) {
	MongoClient.connect("mongodb://52.22.212.86:27017/cis550", function(err, db) {
    assert.equal(err, null);
    var collection = db.collection("test");
    output_test(res, collection, query);	
	});
}

var output_test = function(res, collection, query) {
	collection.find({'USERNAME': query.username}).toArray(function(err,items) {
		if(items.length != 0) {
			res.redirect('/register?error=username already exist');
		} else {
			if(query.passwordconfirm != query.password) {
				res.redirect('/register?error=different password inputs');
			}else if(query.passwordconfirm == '' || query.password ==''){
				res.redirect('/register?error=please input password');
			}else if(!reg.test(query.username) || !reg.test(query.password)){
				res.redirect('/register?error=only digits and characters accepted');
			}else {
				collection.insert({'USERNAME': query.username, 'PASSWORD':query.password});
				res.render('user.jade', {title: query.username});
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


//exports.do_work = function(req, res){
//	  console.log(req);
//		  res.render('user.jade', { 
//			  title: 'New User '
//		  });
//	  
//	};