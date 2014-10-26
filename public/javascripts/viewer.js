$(function() {
	var config = window.global.config;
	var files  = config.files;
	var item_container = $('#touchslider-item-container');

	initTouchSlider();
	initMotio();
	createImg();


	function initTouchSlider() {
		$('.touchslider-container').touchSlider({
			duration: 350,
			delay: 2000,
			margin: 320,
			mouseTouch: true,
			autoplay: false
		})
	}
	function initMotio() {
		var element = document.querySelector('#panning');
		var panning = new Motio(element, {
			fps: 30,
			speedX: -30
		});
		panning.play();
	}

	function createImg() {
		//画像生成
		for (var i=0; i<files.length; i++) {
			if (files[i].match(/\.DS_Store/i)) {
				// なにもしない
			} else {
				//var item = '<div class="touchslider-item"><img src="'+files[i]+'></div>';
				console.log()

				//var item = '<div class="touchslider-item">';
				var item = $("<div/>").addClass("touchslider-item").append('<img src="'+files[i]+'">');
				item_container.append(item);
			}
		}
	}
});
