/**
 * http://usejsdoc.org/
 */
exports.do_work = function(req, res){
  		  
		  console.log(req);
		  if (req.query != null) {
			  res.render('register.jade', { 
				  title: 'New User ', error:req.query.error
			  });
		  } else {
			  res.render('register.jade', { 
				  title: 'New User '});
		  }
	  
	};