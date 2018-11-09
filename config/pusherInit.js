const KEYS = require('./keys');

var pusherConfig = {
	appId : KEYS.PUSHER_APPID,
	key : KEYS.PUSHER_KEY,
	secret : KEYS.PUSHER_SECRET,
	cluster : KEYS.PUSHER_CLUSTER,
	encrypted : true
}

module.exports = pusherConfig