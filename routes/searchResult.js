exports.do_work = function(req, res){
	  if (req.query != null) {
		  res.render('searchResult.jade', { 
			  title: '', error:req.query.error
		  });
	  } else {
		  var result = [];
		  result.push({"node3" : ["node4", "node1", "node2"]});
		  result.push({"node1" : ["node0", "node3"]});
		  result.push({"node0" : ["node1", "node7"]});
		  result.push({"node7" : ["node0", "node2"]});
		  result.push({"node2" : ["node3", "node7", "node5"]});
		  res.render('searchResult.jade', {title: '', mapResult: result});
	  }
	  
	};