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
		var item = $("<div/>").append('<img src="'+filename+'">').addClass("slide");
		var apperece_container = $("<div/>");
		var apperence_baloon = $("<div>").append('<img src="/images/baloon.png">').addClass('apperence-baloon');
		var apperence_item = item.clone();
		apperence_item.addClass('apperence-item');
		apperence_item.css("opacity", 1);
		
		apperece_container.append(apperence_baloon);
		apperece_container.append(apperence_baloon.clone());
		apperece_container.append(apperence_item);

		apperece_container.appearanceAnimate(item);
	}

	function initAnimation(original_slide) {
		$.fn.appearanceAnimate = function(original_slide) {
			var obj = this;
			var opt = {
				speed: 2,
				y_src: $(document).height(),
				x_src: ($(document).width() / 2),
				y_dest: -20,
				y_after_dest: -220,
				y_toStartSly: 250,
				x_revition: 50,
				sec: 30
			};
			var _x = opt.x_src;
			var _y = opt.y_src;
			var step = 0;

			obj.addClass('apperence-container');
			$('body').append(obj);
			_x += -obj.width()/2 + opt.x_revition;

			re_coord(_x, _y);

			var is_start_sly = false;
			function animate() {
				if (_y > opt.y_dest) {
					update();
					setTimeout(function() {
						animate();
					}, opt.sec);
					if (_y < opt.y_toStartSly && !is_start_sly) {
						is_start_sly = true;
						// オリジナルslideを非表示で追加
						original_slide.css("visibility", "hidden").addSly();
						original_slide.toStartSly();
					}
				} else {
					// ダミーslideを削除する
					obj.find('.apperence-item').fadeOut(1000, function() {
						$(this).remove();
					});
					// オリジナルslideの再表示
					setTimeout(function() {
						original_slide.css("visibility", "visible");
					}, 100);
					// 風船だけさらに飛ばし続ける
					after_animate();
				}
			};
			animate();

			function after_animate() {
				if (_y > opt.y_after_dest) {
					update();
					setTimeout(function() {
						after_animate();
					}, opt.sec);
				}
			}

			function re_coord(x,y) {
				obj.css("top", y+"px");
				obj.css("left", x+"px");
			}

			function update() {
				_y -= opt.speed;
				step += random(1,10) / 100
				_x += Math.cos(step);
				re_coord(_x, _y);
			}

			function randam(min, max) {
				return Math.round(min + Math.random()*(max-min));
			}
		};
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
			scrollBar: $wrap.find('.scrollbar'),
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
			$frame.sly('toStart');
		});

		$wrap.find('.end').on('click', function () {
			var item = $(this).data('item');
			$frame.sly('toEnd');
		});

		$.fn.addSly = function() {
			var obj = this;
			console.log($frame);
			$frame.sly('add', obj, 0);
		};

		$.fn.toStartSly = function() {
			$frame.sly('toStart');
		};
	}

	function initSocket() {
		//サーバーが受け取ったメッセージを返して実行する
		var socket = io.connect('http://mamoru-mbp15.local/');
		socket.on('updated', function (msg) {
			console.log(msg.file);
			prependImg(msg.file);
		});
	}
});
