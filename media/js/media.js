$(function(){
	for (var i = 1; i < 6; i++) {
		$this=$($(".pic-list").find("li").get(i-1));
		$this.addClass("pica");
		$($(".pic-list").find("li").get(i-1)).attr("id","num"+i);
	};
});
/*
$(function() {
	var b = $(".wrap-pic").offset().top;
	var d = $(".wrap-video").offset().top;
	$(window).scroll(function() {
		var a = $(document).scrollTop();
		var c = a - b;
		console.log(c);
		if (c > 100) {
			$(".video").addClass("cur");
			$(".pic").removeClass("cur");
			$(".pic").attr("id", "");
			$(".video").attr("id", "select");
		}else{
			$(".video").removeClass("cur");
			$(".pic").addClass("cur");
			$(".pic").attr("id", "select");
			$(".video").attr("id", "");
		};
	});
	$(".pic").click(function(){
		$("body,html").animate({
			scrollTop:b
		},1000);
		return false;
	});
	$(".video").click(function(){
		$("body,html").animate({
			scrollTop:d
		},1000);
		return false;
	});
});
*/