/**
 * http://usejsdoc.org/
 */
exports.do_work = function(req, res){
	  console.log(req);
		  res.render('searchPage.jade', { 
			  title: ''
		  });
	  
	};