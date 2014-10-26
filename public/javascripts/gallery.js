$(function() {
	var config = window.global.config;
	var files  = config.files;
	var item_container = $('#img-container');

	createImg();
	initSocket();

	function createImg() {
		//画像生成
		for (var i=0; i<files.length; i++) {
			if (files[i].match(/\.DS_Store/i)) {
				// なにもしない
			} else {
				appendImg(files[i]);
			}
		}
	}

	function appendImg(filename) {
		var item = $("<div/>").append('<img src="'+filename+'">');
		item_container.append(item);
	}

	function prependImg(filename) {
		var item = $("<div/>").append('<img src="'+filename+'">');
		item.prependTo(item_container).hide().fadeIn(1500);
	}

	function initSocket() {
		//サーバーが受け取ったメッセージを返して実行する
		var socket = io.connect('http://localhost/');
		socket.on('updated', function (msg) {
			console.log(msg.file);
			prependImg(msg.file);
		});
	}
});
