/**
 * 第一副场景页面
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
var audio1;
function pageA(element, pageComplete) {
	//根元素
	this.$root = element;
	//小男孩
	this.$boy = element.find(".chs-boy");
	//窗户
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left")
	this.$rightWin = this.$window.find(".window-right")
	//运行动画
	this.run(pageComplete);
}
/**
 * 开窗
 * @return {[type]} [description]
 */
pageA.prototype.openWindow = function(pageComplete) {
	//控制两扇窗打开
	var count = 0;
	var complete = function() {
		++count
		if(count === 2) {
			pageComplete && pageComplete();
		}
	}
	var bind = function(data) {
		data.one("transitionend webkitTransitionEnd", function(event) {
			data.removeClass("window-transition");
			complete();
		});
	}
	bind(this.$leftWin.addClass("window-transition").addClass("hover"));
	bind(this.$rightWin.addClass("window-transition").addClass("hover"));
}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function(options) {
	var dfd = $.Deferred();
	this.$boy.transition(options.style, options.time, "linear", function() {
		dfd.resolve()
	});
	return dfd;
}

/**
 * 停止走路
 * @return {[type]} [description]
 */
pageA.prototype.stopWalk = function() {
	this.$boy.removeClass("chs-boy-deer")
}

/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function(pageComplete) {
	var that = this; //pageA
	var next = function() {
		return this.next.apply(this, arguments); //return new pageA().next();
	}.bind(this);
	//new pageA().next().bind(this);
	//背景音乐
	audio1 = new HTML5Audio('music/circulation.mp3');	
	next({
			"time": 10000,
			"style": {
				"top": "20%",
				"right": "110%",
				"scale": "0.8"
			}
		})
		.then(function() {
			return next({
				"time": 500,
				"style": {
					"rotateY": "-180",
					"scale": "1.2"
				}
			})
		})
		.then(function() {
			return next({
				"time": 5000,
				"style": {
					"top": "75%",
					"right": "25%"
				}
			})
		})
		.then(function() {
			that.stopWalk();
		})
		.then(function() {
			that.openWindow(function() {
				pageComplete&&pageComplete();			
			});
		});
}