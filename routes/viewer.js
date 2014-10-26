var async = require('async');
var fs= require('fs');

module.exports = {
	get: function(req, res) {
		async.waterfall([
			function(callback) {
				var dir = './uploads';
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
	}
};

