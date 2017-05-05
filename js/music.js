/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function HTML5Audio(url, loop) {
	var audio = new Audio(url);
	audio.autoplay = true;
	audio.loop = loop || false; //是否循环
	audio.play();
	return {
		end: function(callback) {
			audio.addEventListener('ended', function() {
				callback();
			}, false);
		},
		audio:audio
	}
}
