(function($) {
  var Barrage = {};
  Barrage.config = {
    'color' : ['#ED71FF', 'blue', '#EF607C', 'yellow', '#F4A62A', 'white', '#1ABC9C', '#86FFB7', '#009FA7'],
    'speed' : [10000,9000,8000,7000,6000,5000,4000 ],
    'fontSize' : "20px",
    'height' : 0,
    'boxHeight' : 0,
    'submitHeight' : 72,
    'width' : 0,
    'top' : 0,
    'left' : 0,
    'obj' : $("#cyBarrage"),
    'bodyOverflow' :'',
    'isFull' : false,
    'fullSubmitOpen' : false,
    'commentDialogShow' : true,
    'comment' : '<div id="cybarrage-submit-box"><div class="barrage-submit-box-container" ><div class="barrage-submit-box-content"><input id="cybarrage-submit-content" placeholder="咱也来一发吧~" class="barrage-submit-text barrage-dialog-op" type="text" /></div><div class="barrage-submit-box-btn"><span id="cybarrage-submit-btn" class="barrage-submit-btn barrage-dialog-op">写好了！</span></div><a class="cybarrage-submit-box-close" href="javascript:void(0)"><img border="0" src="http://changyan.sohu.com/img/barrage/barrageClose3.png" /></a></div></div>'
  };
  $.loadCss($.Host+'/css/plugin/barrage.css');
  var ready = false;
  var url = "http://changyan.sohu.com/api/labs/imgBarrage";
  var url2 = "http://changyan.sohu.com/api/labs/barrage/submit";
  var topicId = 0;
  var pos = 0;
  var isIE8 = false;
  
  $.stat("barrage");

  $('.comments-img').load(function(){
	  if (!ready) {
        var h = $(this).height();
        var w = $(this).width();
        if(h >= 300 && w >= 400) {
        	var html = '' 
        	+ '<div class="cybarrage-op-btn">'
      		  +	'<span class="cyimage-barrage-submit" id="cyimage-barrage-id-submit" title="发表评论"></span>'
      		  + '<span class="cyimage-barrage-full" id="cyimage-barrage-id-full" title="全图弹幕"></span>'
      		  + '<span class="cyimage-barrage-close " id="cyimage-barrage-id-close" title="关闭弹幕"></span>'
      		+ '</div>'
    		+ '<div class="cybarrage-full-op-btn">'
      	      +	'<span class="cyimage-barrage-rescover-screen" id="cyimage-barrage-id-rescover-screen" title="恢复大小"></span>'
    		  +	'<span class="cyimage-barrage-full-submit" id="cyimage-barrage-id-full-submit" title="发表评论"></span>'
    		+ '</div>'
      		+ '<div class="cyBarrage-comment-box"></div>'
      		+ '<div class="cyBarrage-comment-dialog"></div>';
        	$("#cyBarrage").html(html);
            $("body").append('<div id="cytbox" style="display:;"><div id="cyicon"><img id="cyimage-barrage-id-full-screen" src="http://changyan.sohu.com/img/barrage/fullScreen.png"/></div><span>全屏弹幕</span></div>');
        	var _h = (h * 0.45) > 100 ? (h * 0.45) : 100;
            Barrage.config.width = 1000;
            Barrage.config.height = 610;
            Barrage.config.boxHeight = _h;
            Barrage.config.top = 55;
            Barrage.config.left = 0;
            Barrage.config.bodyOverflow = $("body").css("overflow");
            Barrage.config.obj.css("top", Barrage.config.top);
            Barrage.config.obj.css("left",Barrage.config.left);
            Barrage.config.obj.css({"height": _h, "width": w});
            $(".cyBarrage-comment-box").css({"height": _h, "width": w});
    		$(".cyBarrage-comment-dialog").css({"height": "100px"});
    		$(".cyBarrage-comment-dialog").append(Barrage.config.comment);
    		//$(".cyBarrage-comment-dialog").hide();
			var cw = w - 140;
			var cl = isIE() == 7 ? "15px" : "30px";
			var bl = cw + 30;
			var cbl = bl + 80;
			$(".cybarrage-full-op-btn").hide();
			$(".barrage-submit-box-content").css({"width": cw});
			$(".barrage-submit-box-btn").css({"margin-left" : bl + "px"});
			$("#cybarrage-submit-content").css("width", cw);
			// ie7 double padding
			if (isIE() == 7) {
				$("#cybarrage-submit-content").css("width", cw - 12);
			}
			$(".cybarrage-submit-box-close").css("margin-left",cbl + "px");
            if(isIE() == 9 || isIE() == 8 || isIE() == 7) {
            	isIE8 = true;
            } else {
            	initAnimation(new Array('@keyframes', '@-moz-keyframes', '@-webkit-keyframes', '@-o-keyframes'), 2000);
            }
            ready = true;
            $.ajax({
                'type' : 'get',
                'url' : url,
                'data' : {
                    'client_id' : jChangyan.appid,
                    'topic_url' : $.url,
                    'topic_source_id' : $.sid || '',
                    'topic_title' : 'no_title'
                },
                'success' : function(data) {
                	if (data.fullScreenOnoff == true) {
                		if (data.fullScreenPosition != 0) {
                    		$("#cytbox").css({"bottom": data.fullScreenPosition});
                    	}
                	} else {
                		$("#cytbox").hide();
                	}
                	if (data.fullImage == true) {
                		$('#cyimage-barrage-id-full').click();
                	}
                	var seconds = 2;
                	for (var b in data.list) {
                        launch(data.list[b], seconds);
                		seconds += 2;
                	}
                	topicId = data.topicId;
                },
                'dataType' : 'jsonp',
                'scriptCharset' : 'utf-8'
            });
            $("#cytbox").animate({
                "right" : 0
                }, 0, "swing",function() {
            });
        }
	  }
	}).each(function(){
		if(this.complete) {
			$(this).load();
		}
	});
  
  /*$("#cytbox").mouseenter(function(){
	  $("#cytbox").animate({
          "right" : 0
          }, 100, "swing",function() {
      });
  });
  
  $("#cytbox").mouseleave(function(){
	  $("#cytbox").animate({
          "right" : -68
          }, 100, "swing",function() {
      });
  });*/
  
  $("#cyBarrage").on("click","#cyimage-barrage-id-full",function(){
	  var wh = $('#cyBarrage').height();
	  var bh = $(".cyBarrage-comment-box").height();
	  if(wh==Barrage.config.height) {
		  if(wh == bh) {
			  $('#cyBarrage').height(Barrage.config.boxHeight);
			  $(".cyBarrage-comment-box").height(Barrage.config.boxHeight);
		  } else {
			  $('#cyBarrage').height(Barrage.config.boxHeight + Barrage.config.submitHeight);
			  $(".cyBarrage-comment-box").height(Barrage.config.boxHeight);
		  }
		  $(".cyimage-barrage-full").css("background-image", "url(http://changyan.sohu.com/img/barrage/barrageFull.png)");
	  } else {
		  if(wh == bh) {
			  $('#cyBarrage').height(Barrage.config.height);
			  $(".cyBarrage-comment-box").height(Barrage.config.height);
		  } else {
			  $('#cyBarrage').height(Barrage.config.height);
			  $(".cyBarrage-comment-box").height(Barrage.config.height-Barrage.config.submitHeight);
		  }
		  $(".cyimage-barrage-full").css("background-image", "url(http://changyan.sohu.com/img/barrage/barrageMin.png)");
	  }
  });
  
  $("body").on("click","#cyimage-barrage-id-full-screen",function(){
	  var h = $(window).height();
	  var t = $(window).scrollTop();
	  var w = $(window).width();
	  $("body").css("overflow","hidden");
	  //$(".cybarrage-submit-box-close").hide();
	  //$(".cybarrage-op-btn").hide();
	  //$(".cyBarrage-comment-dialog").hide();
	  $(".cybarrage-full-op-btn").show();
	  $('#cyBarrage').css({
    	  "top" : t,
    	  "left" : 0,
    	  'height' : h,
    	  'width' : w });
	  t = t + 30;
	  $(".cyBarrage-comment-box").css({"height": h - t, "width": w, "top": t});
	  var l = (w - $("#cybarrage-submit-content").width()) / 2;
	  $(".barrage-submit-box-content").css({"margin-left": l});
	  $(".barrage-submit-box-btn").css({"margin-left": l + $(".barrage-submit-box-content").width()});
	  Barrage.config.fontSize = "40px";
	  $(".cyBarrage-comment-box b").css("font-size","40px");
	  $("#cyimage-barrage-id-full-submit").click();
	  $("#cytbox").hide();
  });
  
  $("#cyBarrage").on("click","#cyimage-barrage-id-rescover-screen",function(){
	  $("body").css("overflow", Barrage.config.bodyOverflow);
	  $(".cybarrage-full-op-btn").hide();
	  $(".cybarrage-op-btn").show();
	  //$(".cyBarrage-comment-dialog").show();
	  $('#cyBarrage').css({
    	  "top" : Barrage.config.top,
    	  "left" : Barrage.config.left,
    	  'height' : Barrage.config.height,
    	  'width' : Barrage.config.width });
	  var l = 30;
	  $(".barrage-submit-box-content").css({"margin-left": l});
	  $(".barrage-submit-box-btn").css({"margin-left": l + $(".barrage-submit-box-content").width()});
	  Barrage.config.fontSize = "20px";
	  $(".cyBarrage-comment-box b").css("font-size","20px");
	  $("#cyimage-barrage-id-full-submit").click();
	  $("#cytbox").show();
  });
  
  $("#cyBarrage").on("click","#cyimage-barrage-id-full-submit",function(){
	  var bh = $(".cyBarrage-comment-box").height();
	  var sh = $(".cyBarrage-comment-dialog").height();
	  if (Barrage.config.fullSubmitOpen == false) {
		  $(".cyBarrage-comment-box").css({"height": bh - sh});
		  $(".cyBarrage-comment-dialog").show();
		  Barrage.config.fullSubmitOpen = true;
	  } else {
		  $(".cyBarrage-comment-box").css({"height": bh + sh});
		  $(".cyBarrage-comment-dialog").hide();
		  Barrage.config.fullSubmitOpen = false;
	  }
  });
  
  $("#cyBarrage").on("click","#cyimage-barrage-id-close",function(){
	  $(".comments-wrap").css("top","-1000px");
  });
  
  $("#cyBarrage").on("click","#cyimage-barrage-id-submit",function(){
	   var wh = $('#cyBarrage').height();
	   var bh = $(".cyBarrage-comment-box").height();
	   // 闂呮劘妫
	   if(wh != bh) {
		   if (wh == Barrage.config.height) {
			   $(".cyBarrage-comment-box").height(wh);
		   } else {
			   $('#cyBarrage').height(bh);
		   }
	   } else if(wh == Barrage.config.height){
		   $(".cyBarrage-comment-box").height(wh - Barrage.config.submitHeight);
	   } else {
		   $('#cyBarrage').height(wh + Barrage.config.submitHeight);
	   }
	   if (Barrage.config.commentDialogShow == false) {
		   $(".cyBarrage-comment-dialog").show();
		   Barrage.config.commentDialogShow = true;
	   } else {
		   $(".cyBarrage-comment-dialog").hide();
		   Barrage.config.commentDialogShow = false;
	   }
	   if (isIE() == 7) {
		   $(".barrage-submit-text").css({"margin-top": -1});
	   }
  });
  
  
  $("#cyBarrage").on("click","#cybarrage-close-btn",function(){
	   var wh = $('#cyBarrage').height();
	   var bh = $(".cyBarrage-comment-box").height();
	   if (wh == Barrage.config.height) {
		   $(".cyBarrage-comment-box").height(wh);
	   } else {
		   $('#cyBarrage').height(bh);
	   }
  });
  
  
  $("#cyBarrage").on("click",".barrage-submit-box-btn",function(){
	  var content = $('#cybarrage-submit-content').val();
	  if(content != "") {
	      $.ajax({
	          'type' : 'get',
	          'url' : url2,
	          'data' : {
	              'client_id' : jChangyan.appid,
	              'topic_id' : topicId,
	              'content' : content,
	              'start_time' : '0',
	              'show_type' : '1'
	          },
	          'success' : function(data) {
	          },
	          'dataType' : 'jsonp',
	          'scriptCharset' : 'utf-8'
	      });
	      $('#cybarrage-submit-content').val("");
	      launch("我："+content, 1);
	 }
  });
  
  $('#cybarrage-submit-content').keydown(function(e){
  if(e.keyCode==13){
     var content = $('#cybarrage-submit-content').val();
    if(content != "") {
        $.ajax({
            'type' : 'get',
            'url' : url2,
            'data' : {
                'client_id' : jChangyan.appid,
                'topic_id' : topicId,
                'content' : content,
                'start_time' : '0',
                'show_type' : '1'
            },
            'success' : function(data) {
            },
            'dataType' : 'jsonp',
            'scriptCharset' : 'utf-8'
        });
        $('#cybarrage-submit-content').val("");
        launch("我："+content, 1);
   }
  }
  });

  $("#cyBarrage").on("click", ".cybarrage-submit-box-close", function(){
	  var wh = $('#cyBarrage').height();
	  if (wh == Barrage.config.height) {
		  $(".cyBarrage-comment-box").height(wh);
	  } else {
		  $('#cyBarrage').height(Barrage.config.boxHeight);
	  }
	  if (Barrage.config.commentDialogShow == false) {
		   $(".cyBarrage-comment-dialog").show();
		   Barrage.config.commentDialogShow = true;
	   } else {
		   $(".cyBarrage-comment-dialog").hide();
		   Barrage.config.commentDialogShow = false;
	  }
  });
  
  function initAnimation(names, l) {
      var s1 = l * 0.9;
      var s2 = l * 0.1;
      var animation = document.createElement('style');
      animation.type = "text/css";
      for (var name in names) {
	      var template = document.createTextNode(names[name] + ' cybarrage {' +
	      		'0% { left: ' + l + 'px; visibility:visible } ' +
	      		'5% { left: ' + s1 + 'px; } ' +
	      		'95% { left: ' + s2 + 'px; } ' +
	      		'100% { left: -100px; } }');
	      animation.appendChild(template);
      }
      document.getElementsByTagName("head")[0].appendChild(animation);
  }
  
  function launch(content, seconds) {
	  setTimeout(function(){_launch(content);} , seconds * 1000);
  }
  function _launch(content, border) {
	var bh = $(".cyBarrage-comment-box").height();
    var _color = random_render(Barrage.config.color);
    var _speed = 10000 || random_render(Barrage.config.speed);
    var _y_pos = Math.random() * bh + 24;
    var right = $(window).width() + 100;
    _y_pos = (_y_pos + 25) > bh ? (bh - 20) : _y_pos;
    var words = $("<b>" + htmlEscape(content) + "</b>");
    words.css("font-size", Barrage.config.fontSize);
    words.css("color", _color);
    words.css("top", _y_pos);
    words.attr("zoom", 1000);
    $(".cyBarrage-comment-box").append(words);
    if(isIE8) {
    	words.css("visibility", "visible");
        $(words).animate({
            "right" : right
            }, _speed, "swing",function() {
        });
    }
  }
  
  function random_render(config_item) {
      return config_item[Math.floor(Math.random() * config_item.length)];
  }
  
  function isIE() {
	  var myNav = navigator.userAgent.toLowerCase();
	  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }
  
  function htmlEscape(str) {
	    return String(str)
	            .replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;');
	}

})(jChangyan);