var path = require('path');
var fs = require('fs');
var redis = require('redis');
var redisClient = redis.createClient();
redisClient.on("error", function(err) {
	console.log("Error!" + err);
});

module.exports = {
	post: function(req, res) {
		var tmp_filename = path.basename(req.files.attachment1.path);
		var original_filename = req.files.attachment1.originalFilename;
		var dir_name = 'uploads/';

		console.log(tmp_filename);
		console.log(original_filename);

		fs.rename(dir_name+tmp_filename, dir_name+original_filename, function(err) {
			if (err) {
				console.log(err);
				throw err;
			} else {
				redisClient.publish('uploads', JSON.stringify({file: original_filename}));
				/*
				fs.unlink(dir_name+tmp_filename, function(error) {
					if (error) {
						console.log(error);
						throw error;
					} else {
					}
				});
				*/
			}
		});
		res.send({success: true});
	}
};

