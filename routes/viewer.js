var async = require('async');
var fs= require('fs');
var exec = require('child_process').exec;
var dirname = 'uploads';

module.exports = {
	get: function(req, res) {
		async.waterfall([
			function(callback) {
				var dir = './' + dirname;
				fs.readdir(dir, function(err, files) {
					if (err) {
						callback(err);
					}
					var retData = {
						files: files
					};
					console.log(retData);
					return res.render('slide', retData);
				})
			}
		], function(err, callback) {
			if (err) {
				res.render('error', {err_message: err.message, err_stack: err.stack});
			} else {
				callback();
			}
		});
	},
	del: function(req, res) {
		var cmd = 'rm -f ' + dirname + '/*';
		var child = exec(cmd, function(err, stdout, stderr) {
			if (!err) {
				res.redirect('/viewer');
			} else {
				console.log(err);
				res.send({error: err})
			}
		});
	}
};

