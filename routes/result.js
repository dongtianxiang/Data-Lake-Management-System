/**
 * http://usejsdoc.org/
 */
exports.do_work = function(req, res){
	  console.log(req.query);
	  var map = {};
	  map[1] = "AAA";
	  res.render('resultPage.jade', {
		  title: '', keyword: req.query, Keymap: map
	  });
	  
	};