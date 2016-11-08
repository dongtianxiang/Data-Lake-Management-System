
/*
 * GET home page.
 */
exports.do_work = function(req, res){
	  console.log(req);
	  if (req.query != null) {
		  res.render('index.jade', { 
			  title: '', error:req.query.error
		  });
	  } else {
		  res.render('index.jade', { 
			  title: ''});
	  }
	  
	};