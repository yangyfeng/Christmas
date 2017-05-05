/**
 * 第二副场景页面
 *
 */
function pageB(element, pageComplete) {
	//圣诞男孩
	var $boy = element.find(".christmas-boy");
	//女孩
	var $girl = element.find(".girl");
	//动画结束的监听事件
	var animationEnd = "animationend webkitAnimationEnd";
	/*——————————————————————————————————————————————————————————————————————*/
	/**
	 * 小男孩动作
	 * @return {[type]} [description]
	 */
	var boyAction = {
		//走路
		walk: function() {
			var dfd = $.Deferred();
			$boy.transition({
				"right": "4.5rem"
			}, 4000, "linear", function() {
				dfd.resolve()
			});
			return dfd;
		},
		//停止走路
		stopWalk: function() {
			$boy.removeClass("boy-walk");
			$boy.addClass("boy-stand");
		},
		//继续走路
		runWalk: function() {
			$boy.addClass("walk-run");
		},
		//解开包裹
		unwrapp: function() {
			var dfd = $.Deferred();
			$boy.addClass("boy-unwrapp");
			$boy.removeClass("boy-stand");
			$boy.one(animationEnd, function() {
				dfd.resolve();
			})
			return dfd;
		},
		//脱衣动作
		//1-3
		strip: function(count) {
			$boy.addClass("boy-strip-" + count).removeClass("boy-unwrapp");
		},
		//人物用拥抱
		//重叠问题处理
		hug: function() {
			$boy.addClass("boy-hug").one(animationEnd, function() {
				$(".christmas-boy-head").show()
			})
		}
	}
	/*——————————————————————————————————————————————————————————————————————————————*/
	/**
	 * 小女孩动作
	 * @return {[type]} [description]
	 */
	var girlAction = {
		//女孩起身
		standUp: function() {
			var dfd = $.Deferred();
			//站立
			setTimeout(function() {
				$girl.addClass("girl-standUp");
			}, 200);
			//放下书
			setTimeout(function() {
				$girl.addClass("girl-throwBook");
				dfd.resolve();
			}, 500);
			return dfd;
		},
		//女孩走路
		girlWalk: function() {
			var dfd = $.Deferred();
			$girl.addClass("girl-walk");
			$girl.transition({ left: "4.5rem" }, 4000, "linear", function() {
				dfd.resolve();
			});
			return dfd;
		},
		//女孩停止走路
		girlStopWalk: function() {
			$girl.removeClass("girl-throwBook girl-standUp girl-walk").addClass("girl-stand walk-stop");
		},
		//选择3d
		girlChoose: function() {
			var dtd = $.Deferred();
			//3d旋转
			//3d旋转节点
			var $carousel = element.find("#carousel");
			//旋转木马对象
			var carousel = new Carousel($carousel, {
				imgUrls: [
					"images/carousel/1.png",
					"images/carousel/2.png",
					"images/carousel/3.png"
				],
				videoUrls: [
					"images/carousel/1.mp4",
					"images/carousel/2.mp4",
					"images/carousel/3.mp4"
				]
			});
			carousel.run(1)
				.then(function() {
					return carousel.palyVideo(0, function() {
						boyAction.strip(1);
					});
				})
				.then(function() {
					return carousel.run(2);
				})
				.then(function() {
					return carousel.palyVideo(1, function() {
						boyAction.strip(2);
					});
				})
				.then(function() {
					return carousel.run(3);
				})
				.then(function() {
					return carousel.palyVideo(2, function() {
						boyAction.strip(3);
					});
				})
				.then(function() {
					$girl.addClass("girl-choose").removeClass("walk-stop");
					$girl.one(animationEnd, function() {
						//callback();
						dtd.resolve();
					});
				});
			return dtd;
		},
		//泪奔
		weepWalk: function(callback) {
			$girl.removeClass("girl-choose").addClass("girl-weep");
			$girl.transition({
				"left": "7rem"
			}, 1000, "linear", function() {
				$girl.removeClass("girl-weep").addClass("girl-stand ");
				callback();
			})
		},
		girlHug: function() {
			$girl.addClass("girl-hug walk-run");
		}
	};
	/*————————————————————————————————————————————————————————————————————————————————*/
	//男孩开始走路--------------------以男孩的动作为主线展开
	//背景音乐	
	audio1.audio.pause();		
	new HTML5Audio('music/scene.mp3',true);
	boyAction.walk()
		.then(function() {
			//停止走路
			boyAction.stopWalk();
		})
		.then(function() {
			//---------------------女孩动作---------------------------------------
			//起立
			girlAction.standUp();
		})
		.then(function() {
			//走路
			return girlAction.girlWalk();
		})
		.then(function() {
			//停止走路
			girlAction.girlStopWalk();
		})
		.then(function() {
			//解开包裹
			return boyAction.unwrapp();
		})
		.then(function() {
			//女孩选择礼物
			return girlAction.girlChoose();
		})
		.then(function() {
			//继续走路
			girlAction.weepWalk(function() {
				//女孩拥抱
				girlAction.girlHug();
				//男孩拥抱
				boyAction.hug();				
			})
		})
		.then(function() {
			//隐藏照片
			$("#carousel").animate({ "opacity": "0" }, 1000, "linear", function() {
				//回调进入C场景
				pageComplete && pageComplete();
			});
		});
	/*小男孩动作结束*/
	/*——————————————————————————————————————————————————————————————————————————————————————————*/
	//小女孩开始独立动作
	/*girlAction
		//起立
		.standUp()
		.then(function() {
			//走路
			return girlAction.girlWalk();
		})
		.then(function() {
			//停止走路
			return girlAction.girlStopWalk();
		})
		.then(function() {
			//选择3d
			girlAction.girlChoose(function() {
				//继续走路
				girlAction.weepWalk(function() {
					//拥抱
					girlAction.girlHug();
				});
			});
		});*/

}