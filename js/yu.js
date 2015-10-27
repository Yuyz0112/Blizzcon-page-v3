$(function() {
	/*Nav-bar*/
	$(".nav-btn").bind("mouseover", function() {
		$(".nav a").removeClass("cur");
		$(this).addClass("cur");
		$(".home").removeClass("fa-home");
	});
	$(".nav-btn").click(function(){
		$("#select").attr("id","");
		$(this).attr("id","select");
	})
	$(".nav a").bind("mouseout", function() {
		$(".nav a").removeClass("cur");
		$("#select").addClass("cur");
		$(".home").addClass("fa-home");
	});
	$(".home-logo").bind("mouseover", function() {
		$(".nav a").removeClass("cur");
	});
	$(".home-logo").bind("mouseout", function() {
		$("#select").addClass("cur");
	});
	$(".hot").bind("mouseover", function() {
		$(".home").addClass("fa-thumbs-up");
	});
	$(".hot").bind("mouseout", function() {
		$(".home").removeClass("fa-thumbs-up");
	});
	$(".stream").bind("mouseover", function() {
		$(".home").addClass("fa-video-camera");
	});
	$(".stream").bind("mouseout", function() {
		$(".home").removeClass("fa-video-camera");
	});
	$(".match").bind("mouseover", function() {
		$(".home").addClass("fa-calendar");
		$(".header").removeClass("nav-hide");
		$(".pin").addClass("pin-hide");
	});
	$(".match").bind("mouseout", function() {
		$(".home").removeClass("fa-calendar");
	});
	$(".pic").bind("mouseover", function() {
		$(".home").addClass("fa-image");
		$(".header").removeClass("nav-hide");
		$(".pin").addClass("pin-hide");
	});
	$(".pic").bind("mouseout", function() {
		$(".home").removeClass("fa-image");
	});
	$(".video").bind("mouseover", function() {
		$(".home").addClass("fa-play-circle");
	});
	$(".video").bind("mouseout", function() {
		$(".home").removeClass("fa-play-circle");
	});
	$(".comm").bind("mouseover", function() {
		$(".home").addClass("fa-comments");
	});
	$(".comm").bind("mouseout", function() {
		$(".home").removeClass("fa-comments");
	});
	$(".pin").bind("mouseover", function() {
		$(".home").removeClass("fa-home");
		$(".header").removeClass("nav-hide");
	});
	$(".pin").bind("mouseout", function() {
		$(".home").addClass("fa-home");
		$(".header").addClass("nav-hide");
	});
	/*
		var a = $(document).scrollTop();
		var b = $(".header").outerHeight();
		$(window).scroll(function() {
			var c = $(document).scrollTop();
			if (c > b) {
				$(".header").addClass("nav-hide");
				$(".pin").addClass("pin-show");
			} else {
				$(".header").removeClass("nav-hide");
				$(".pin").removeClass("pin-show");
			}
			if (c > a) {
				$(".header").removeClass("nav-show");
				$(".pin").removeClass("pin-hide");
			} else {
				$(".header").addClass("nav-show");
				$(".pin").addClass("pin-hide");
			}
			a = $(document).scrollTop();
		});
	$(".pin").click(function() {
		var speed = 1000;
		$("body,html").animate({
			scrollTop: 0
		}, speed);
		return false;
	});
	*/

	/*Slide*/
	var unslider = $(".slide").unslider({
		speed: 1000,
		delay: 3000,
		dots: true,
	});

	$(".btn-slide").click(function() {
		var fn = this.className.split(" ")[1];
		unslider.data("unslider")[fn]();
	});
	for (var i = 0; i < $(".slide .text").length; i++) {
		var u = $(".text .pic1")[i].src;
		u = "url(" + u + ")";
		$($(".slide").find("li").get(i)).css("background", u);
	};

	/*Schedule Tab*/
	$(".date-btn").bind("mouseover", function() {
		$(".date-btn").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".date-btn").bind("mouseout", function() {
		$(".date-btn").removeClass("cur");
		$("#today").addClass("cur")
	});
	$(".date-btn").click(function() {
		$(".date-btn").removeClass("cur");
		$(".date-btn").attr("id", "");
		$(this).addClass("cur");
		$(this).attr("id", "today");
	});
	$(".1108").hide();
	$(".date1107").click(function() {
		$(".1107").show();
		$(".1108").hide();
	});
	$(".date1108").click(function() {
		$(".1107").hide();
		$(".1108").show();
	});

});

/*pjax*/
$(document).pjax("a", "#container", {
	fragment: "#pjax-container",
	timeout: 8000
});

/*Schedule Scrollbar*/
$(".table").mCustomScrollbar({
	autoDraggerLength: true,
	scrollButtons: {
		enable: true
	}
});

/*News List*/

(function($) {
	$(".preloader").show();
	var loadedImages = 0,
		handler = $("#all-tiles li"),
		counts = handler.length;
	$("#all-tiles").imagesLoaded()
		.progress(function(instance, image) {
			loadedImages++;
			var width = $(".progress-bar").width();
			if (loadedImages == counts) {
				$(".preloader").hide();
			} else {
				$(".instance").width(((loadedImages + 1) / counts * 100) + "%");
			};
		});
	$("#all-tiles").imagesLoaded(function() {
		makeTiles(handler);
		$(".more-btn").show();
	});
	formatDate();
})(jQuery);

function makeTiles(lid) {
	lid.wookmark({
		autoResize: true,
		align: "left",
		container: $(".tiles"),
		offset: 10,
		outerOffset: 20,
		itemWidth: 230
	});
	lid.bind("mouseover", function() {
		$(this).css("background", "#91C6FF");
		$(this).find(".share-btn").show();
	});
	lid.bind("mouseleave", function() {
		$(this).css("background", "#E8F2FF");
		$(this).find(".share-btn").hide();
		$(this).find(".share-btn").animate({
			right: "0px",
			bottom: "0px",
			width: "40px",
			height: "40px",
			fontSize: "16px",
			lineHeight: "40px"
		}, 200);
		$(this).find(".share-group").hide();
	});
}

function getList(listName) {
	var list = listName + " " + "li";
	$(".preloader").show();
	bodyContent = $.ajax({
		url: "../bcajax/index.shtml",
		contentType: "application/x-www-form-urlencoded; charset=gb2312",
		global: false,
		type: "GET",
		dataType: "html",
		async: true,
		success: function(data) {
			$(listName).html($(data).filter(listName).html());
			$(".share-btn").click(function() {
				showSharebtn(this);
			})
			$(".close").click(function() {
				closeSharebtn(this);
			})
			$(".like").click(function() {
				like(this);
			})
			formatDate();
			$(".more-btn").hide();
			$(listName).imagesLoaded(function() {
				makeTiles($(list));
				$(".preloader").hide();
			})
		}
	})
}

var addtimes = 2;
$(".more-btn").click(function() {
	addList();
})

function addList() {
	if (addtimes == -1) {
		return false;
	} else {
		$(".more-btn p").html("");
		$(".spinner").show();
		$(document).ready(function() {
			bodyContent = $.ajax({
				url: "../bcajax/index.shtml",
				contentType: "application/x-www-form-urlencoded; charset=gb2312",
				global: false,
				type: "GET",
				dataType: "html",
				async: true,
				success: function(data) {
					addtimes++;
					var addpart = "";
					for (var i = 5 * addtimes; i < 5 * (addtimes + 1); i++) {
						if ($($(data).find(".all-news").get(i)).html() == undefined) {
							addtimes = -1;
							break;
						}
						addpart = addpart + "<li class=all-news>" + $($(data).find(".all-news").get(i)).html() + "</li>";
					}
					var originpart = $("#all-tiles").html();
					originpart += addpart;
					$("#all-tiles").html(originpart);
					$("#all-tiles").imagesLoaded(function() {
						$(".spinner").hide();
						if (addtimes == -1) {
							$(".more-btn p").html("加载完毕");
						} else {
							$(".more-btn p").html("加载更多");
						}
						makeTiles($("#all-tiles li"));
					})
				}
			})
		})
	}
}

$(function() {
	$(".icon-blizz").click(function() {
		$(".tilesmember").hide();
		getList("#all-tiles");
		$("#all-tiles").show();
	});
	$(".icon-wow").click(function() {
		$(".tilesmember").hide();
		getList("#wow-tiles");
		$("#wow-tiles").show();
	});
	$(".icon-hs").click(function() {
		$(".tilesmember").hide();
		getList("#hs-tiles");
		$("#hs-tiles").show();
	});
	$(".icon-hot").click(function() {
		$(".tilesmember").hide();
		getList("#hot-tiles");
		$("#hot-tiles").show();
	});
	$(".icon-d3").click(function() {
		$(".tilesmember").hide();
		getList("#d3-tiles");
		$("#d3-tiles").show();
	});
	$(".icon-sc2").click(function() {
		$(".tilesmember").hide();
		getList("#sc2-tiles");
		$("#sc2-tiles").show();
	});
	$(".ico-ow").click(function() {
		$(".tilesmember").hide();
		getList("#ow-tiles");
		$("#ow-tiles").show();
	});
	$(".filter-item").bind("mouseover", function() {
		$(".filter-item").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".filter-item").bind("mouseout", function() {
		$(".filter-item").removeClass("cur");
		$("#initial").addClass("cur");
	});
	$(".filter-item").click(function() {
		$(".filter-item").attr("id", "");
		$(this).attr("id", "initial");
	});
	$(".news h2").addClass("underline-left");
});

function formatDate() {
	$(".news-date").each(function() {
		if (this.innerHTML.length != 5) {
			this.innerHTML = getMonthDouble(getDate(this.innerHTML).getMonth()) + "/" + getDateDouble(getDate(this.innerHTML).getDate());
		};
	})
}

function getDate(strDate) {
	var date = eval("new Date(" + strDate.replace(/\d+(?=-[^-]+$)/,
		function(a) {
			return parseInt(a, 10) - 1;
		}).match(/\d+/g) + ")");
	return date;
}

function getMonthDouble(month) {
	if (parseInt(month) < 10)
		return "0" + month;
	return month;
}

function getDateDouble(date) {
	if (parseInt(date) < 10)
		return "0" + date;
	return date;
}

$(".share-btn").click(function() {
	showSharebtn(this);
})
$(".close").click(function() {
	closeSharebtn(this);
})
$(".like").click(function() {
	like(this);
})

function showSharebtn(target) {
	$(target).animate({
		right: "90px",
		bottom: "140px",
		width: "60px",
		height: "60px",
		fontSize: "24px",
		lineHeight: "56px"
	}, 500);
	$(target).next().delay(500).show(200);
	$(target).next().next().delay(700).show(200);
	$(target).next().next().next().delay(900).show(200);
	$(target).next().next().next().next().delay(1100).show(200);
	$(target).next().next().next().next().next().delay(1300).show(200);
	$(target).next().next().next().next().next().next().delay(1500).show(200);
}

function closeSharebtn(target) {
	$(target).next().delay(100).hide(100);
	$(target).next().next().delay(200).hide(100);
	$(target).next().next().next().delay(300).hide(100);
	$(target).next().next().next().next().delay(400).hide(100);
	$(target).prev().delay(500).hide(100);
	$(target).delay(600).hide(100);
	$(target).prev().prev().delay(700).animate({
		right: "0px",
		bottom: "0px",
		width: "40px",
		height: "40px",
		fontSize: "16px",
		lineHeight: "40px"
	}, 100);
}

function like(target) {
	if ($(target).css("color") != "rgb(200, 0, 2)") {
		$(target).css("color", "#C80002");
		$(target).find(".fa-heart").animate({
			right: "29px"
		}, 200);
		$(target).next().next().next().delay(200).show();
		$(target).next().next().next().animate({
			bottom: "185px"
		}, 600);
		$(target).next().next().next().delay(50).hide(100);
		$(target).find(".fa-heart").delay(650).animate({
			right: "19px"
		}, 200);
	} else {
		alert("您已经赞过了哦");
	}
}

function weiboShare(url, title) {
	var appkey = "",
		ralateUid = "2653875134",
		t = encodeURI(title),
		pic = "",
		language = "zh_cn";
	var u = "http://service.weibo.com/share/share.php?url=" + url + "&appkey=" + appkey + "&title=" + t + "&pic=" + pic + "&ralateUid=" + ralateUid + "&language=" + language + "";
	window.open(u, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
}

function tencentShare(url, title) {
	var pp = "",
		pic = "",
		t = encodeURI(title),
		appkey = "",
		site = "";
	var u = "http://v.t.qq.com/share/share.php?url=" + url + "&appkey=" + appkey + "&site=" + site + "&pic=" + pic + "&title=" + t + "%23" + pp + "%23";
	window.open(u, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
}

function qzoneShare(url, title) {
	var site = "",
		pic = "",
		t = encodeURI(title),
		desc = "";
	var u = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + t + "&pics=" + pic + "&desc=" + desc + "&summary=" + desc;
	window.open(u, "", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
}

function wechatShare(url) {
	var u = "http://qr.liantu.com/api.php?text=" + url;
	window.open(u, "", "width=300, height=300, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
}

/*Rank Tab*/
$(function() {
	$(".month-rank").hide();
	$(".week-btn").bind("mouseover", function() {
		$(".month-btn").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".week-btn").bind("mouseout", function() {
		$(".week-btn").removeClass("cur");
		$("#origin").addClass("cur");
	});
	$(".month-btn").bind("mouseover", function() {
		$(".week-btn").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".month-btn").bind("mouseout", function() {
		$(".month-btn").removeClass("cur");
		$("#origin").addClass("cur");
	});
	$(".week-btn").click(function() {
		$(".month-btn").removeClass("cur");
		$(".month-btn").attr("id", "");
		$(this).addClass("cur");
		$(this).attr("id", "origin");
		$(".month-rank").hide();
		$(".week-rank").show();
	});
	$(".month-btn").click(function() {
		$(".week-btn").removeClass("cur");
		$(".week-btn").attr("id", "");
		$(this).addClass("cur");
		$(this).attr("id", "origin");
		$(".week-rank").hide();
		$(".month-rank").show();
	});
	for (var i = 1; i < 10; i++) {
		var ranknum = '<span class="numbg' + i + '">' + i + '</span>';
		$($(".week-rank").find("a").get(i - 1)).html(ranknum + $($(".week-rank").find("a").get(i - 1)).html());
		$($(".month-rank").find("a").get(i - 1)).html(ranknum + $($(".month-rank").find("a").get(i - 1)).html());
	}

	/*Fixed advertisement & back-to-top button*/
	var navH = $(".adv").offset().top;
	var navH1 = $(".float-bottom").offset().top;
	$(window).scroll(function() {
		var scroH = $(this).scrollTop();
		if (scroH >= navH1) {
			$(".adv").css({
				"position": "fixed",
				"top": 0,
				"margin-left": "750px"
			});
			$(".top-btn").css("opacity", 1);
		} else {
			$(".adv").css({
				"position": "relative",
				"margin-left": 0
			});
			$(".top-btn").css("opacity", 0);
		}
	});
	$(".top-btn").click(function() {
		var speed = 1000;
		$("body,html").animate({
			scrollTop: 0
		}, speed);
		return false;
	})
});