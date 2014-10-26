var redis = require('redis');
var redisClient = redis.createClient();
if (!process.argv[2]) {
	throw err;
}

redisClient.on("error", function(err) {
	console.log("Error!" + err);
});

redisClient.publish('uploads', JSON.stringify({file: process.argv[2]}));
//process.exit(code=0);
