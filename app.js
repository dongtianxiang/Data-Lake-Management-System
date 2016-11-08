
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , account = require('./routes/account')
  , user = require('./routes/user')
  , register = require('./routes/register')
  , searchPage = require('./routes/searchPage')
  , result = require('./routes/result')
  , http = require('http')
  , aws = require('aws-sdk')
  , path = require('path');

var app = express();

var AWS_ACCESS_KEY = 'AKIAJX37F5PCJI25NIIA';
var AWS_SECRET_KEY = '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';
var S3_BUCKET = 'cis550whereamazinghappens';

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.do_work);
app.post('/account', account.do_work);
app.post('/user', user.do_work);
app.get('/register', register.do_work);
app.get('/searchPage', searchPage.do_work);
app.get('/result', result.do_work);
app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3(); 
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.file_name, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://' + S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
