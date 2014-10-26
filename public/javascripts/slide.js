$(function() {
	var config = window.global.config;
	var files  = config.files;
	var item_container = $('#img-container');


	initAnimation();
	createImg();
	initSly();
	initSocket();
	initSnowFall();

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

	function initSnowFall() {
		$(document).snowfall({

		 flakeCount :50, // 数

   flakeIndex : 1, // スタイルシートのz-indexの値

   maxSpeed : 3, // 最大速度

   minSpeed : 1, // 最小速度

   maxSize  : 30, // 最大サイズ

   minSize  : 10, // 最小サイズ

   image : [

      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
      '/images/4.png',
      '/images/5.png',
      '/images/6.png',
      '/images/7.png'
   ]

});
	}


	function appendImg(filename) {
		var item = $("<div/>").append('<img src="'+filename+'">').addClass("slide");
		//item.animateYurayura();
		item_container.append(item);
	}


	function prependImg(filename) {
		var item = $("<div/>").append('<img src="'+filename+'">').addClass("slide").hide().fadeIn(1500);
		item.addSly();
		//item.prependTo(item_container).hide().fadeIn(1500);
	}

	function initAnimation() {
	}

	function initSly() {
		var $frame = $('#container');
		//var $slidee = item_container;
		var $wrap = $frame.parent();

		$frame.sly({
			horizontal: 1,
			itemNav: 'forceCentered',
			smart: 1,
			activateMiddle: 1,
			activateOn: 'click',
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			//startAt: 3,
			//scrollBar: $wrap.find('.scrollbar'),
			scrollBy: 1,
			speed: 700,
			elasticBounds: 1,
			easing: 'swing',
			//dragHandle: 1,
			//dynamicHandle: 1,
			//clickBar: 1,

			// Buttons
			prev: $wrap.find('.prev'),
			next: $wrap.find('.next')
		});

		$wrap.find('.start').on('click', function () {
			var item = $(this).data('item');
			// Animate a particular item to the start of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toStart');
		});

		$wrap.find('.end').on('click', function () {
			var item = $(this).data('item');
			// Animate a particular item to the start of the frame.
			// If no item is provided, the whole content will be animated.
			$frame.sly('toEnd');
		});

		$.fn.addSly = function() {
    	    var obj = this;
    	    console.log($frame);
    	    $frame.sly('add', obj, 0);
			$frame.sly('toStart');
    	};

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
