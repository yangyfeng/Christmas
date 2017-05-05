function pageC(element, pageComplete) {
	this.$window = element.find(".window");
	this.$leftWin = this.$window.find(".window-left");
	this.$rightWin = this.$window.find(".window-right");
	this.$sceneBg = this.$window.find(".window-scene-bg");
	this.$closeBg = this.$window.find(".window-close-bg");
	//窗户内背景的切换
	this.changeWinBG = function() {
		this.$sceneBg.transition({
			opacity: 0,
		}, 3000);
		//在2s窗户关闭，3s背景隐藏
		this.$closeBg.transition({
			opacity: 1,
		}, 5000);
	};
	//关闭窗户
	this.closeWindow = function() {
		var dtd = $.Deferred();
		var count = 0;
		var complete = function() {
			++count
			if(count === 2) {
				//当两扇窗户都关闭后才会返回
				dtd.resolve();
			}
		}
		var bind = function(element) {
			element.addClass("close").one("animationend webkitAnimationEnd", function(event) {
				complete();
			})
		}
		bind(this.$leftWin);
		bind(this.$rightWin);
		return dtd;
	};
	//动画
	this.next = function(element, options) {
		var dfd = $.Deferred();
		element.transition(options.style, options.time, "linear", function() {
			dfd.resolve()
		});
		return dfd;
	}
	//小鹿飞走
	this.deerFly = function() {
		$("#deer").addClass("deer-animate ");
		var that = this;
		this.next($("#deer"), {
				"time": 5000,
				"style": {
					"bottom": "50%",
					"right": "-6rem",
					"scale": "0.6"
				}
			})
			.then(function() {
				return that.next($("#deer"), {
					"time": 500,
					"style": {
						"rotateY": "-180",
						"scale": "0.5"
					}
				})
			})
			.then(function() {
				return that.next($("#deer"), {
					"time": 5000,
					"style": {
						"bottom": "80%",
						"right": "150%",
						"scale": "0.1"
					}
				})
			});

	}

	/*___________________________________________________________________*/
	/*pageC的动画*/
	var self = this;
	$(function() {
		(function() {
			self.changeWinBG();
			return self.closeWindow();
		})()
		.then(function() {
			//			alert("雪花飘飘，小鹿飞翔");
			new Snowflake("snowflake");
			self.deerFly();
		})
	});
}