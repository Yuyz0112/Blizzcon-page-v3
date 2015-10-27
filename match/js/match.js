$(function() {
	$(".filter-item-stream").bind("mouseover", function() {
		$(".filter-item-stream").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".filter-item-stream").bind("mouseout", function() {
		$(".filter-item-stream").removeClass("cur");
		$("#initial1").addClass("cur");
	});
	$(".filter-item-stream").bind("click", function() {
		$(".filter-item-stream").attr("id", "");
		$(this).attr("id", "initial1");
	});
	$(".filter-item-match").bind("mouseover", function() {
		$(".filter-item-match").removeClass("cur");
		$(this).addClass("cur");
	});
	$(".filter-item-match").bind("mouseout", function() {
		$(".filter-item-match").removeClass("cur");
		$("#initial2").addClass("cur");
	});
	$(".filter-item-match").bind("click", function() {
		$(".filter-item-match").attr("id", "");
		$(this).attr("id", "initial2");
	});
});
/*
$(function() {
	var b = $(".filter-match").offset().top;
	var d = $(".filter-stream").offset().top;
	$(window).scroll(function() {
		var a = $(document).scrollTop();
		var c = a - b;
		console.log(b,d);
		if (c > -350) {
			$(".match").addClass("cur");
			$(".stream").removeClass("cur");
			$(".stream").attr("id", "");
			$(".match").attr("id", "select");
		}else{
			$(".match").removeClass("cur");
			$(".stream").addClass("cur");
			$(".stream").attr("id", "select");
			$(".match").attr("id", "");
		};
	});
	$(".match").click(function(){
		$("body,html").animate({
			scrollTop:b
		},1000);
		return false;
	});
	$(".stream").click(function(){
		$("body,html").animate({
			scrollTop:d
		},1000);
		return false;
	});
});
*/
/*Data for charts*/
var hot_json = {
	"name": "冠军",
	"children": [{
			"name": "决赛1",
			"children": [{
				"name": "Liquid"
			}, {
				"name": "Cloud9"
			}]
		},

		{
			"name": "决赛2",
			"children": [{
				"name": "EG"
			}, {
				"name": "Fnatic"
			}]
		}
	]
}

/* D3 Stuffs*/
function maketreechart(data,depth) {
	var width = 800;
	var height = 400;
	var padding = {
		left: 20,
		right: 20,
		top: 20,
		bottom: 20
	};

	var svg = d3.select(".chart")
		.append("svg")
		.attr("width", width + padding.left + padding.right)
		.attr("height", height + padding.top + padding.bottom)
		.append("g")
		.attr("transform", "translate(" + padding.left + "," + padding.top + ")");

	var tree = d3.layout.tree()
		.size([height, width]);

	//对角线生成器
	var diagonal = d3.svg.diagonal()
		.projection(function(d) {
			return [d.y, d.x];
		});

	var root = data;
	root.x0 = height / 2;
	root.y0 = 0;
	redraw(root);

	function redraw(source) {

		var nodes = tree.nodes(root);
		var links = tree.links(nodes);
		nodes.forEach(function(d) {
			d.y = d.depth * width/depth;
		});

		var nodeUpdate = svg.selectAll(".node")
			.data(nodes, function(d) {
				return d.name;
			});

		var nodeEnter = nodeUpdate.enter();
		var nodeExit = nodeUpdate.exit();

		var enterNodes = nodeEnter.append("g")
			.attr("class", "node")
			.attr("transform", function(d) {
				var x = source.x0 - 20;
				return "translate(" + source.y0 + "," + x + ")";
			})
			.on("click", function(d) {
				toggle(d);
				redraw(d)
			});

		enterNodes.append("rect")
			.attr("class", "nodeRect")
			.attr("width", 100)
			.attr("height", 40)
			.style("fill", function(d) {
				return d._children ? "#91C6FF" : "#E8F2FF";
			});

		enterNodes.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.attr("dx", "5px")
			.attr("dy", "26px")
			.attr("text-anchor", function(d) {
				return "start";
			})
			.text(function(d) {
				return d.name;
			})
			.style("fill-opacity", 0);

		var updateNodes = nodeUpdate.transition()
			.duration(500)
			.attr("transform", function(d) {
				var x = d.x - 20;
				return "translate(" + d.y + "," + x + ")";
			});

		updateNodes.select("circle")
			.attr("class", "nodeRect")
			.attr("width", 40)
			.attr("height", 15)
			.style("fill", function(d) {
				return d._children ? "#91C6FF" : "#E8F2FF";
			});

		updateNodes.select("text")
			.style("fill-opacity", 1);

		var exitNodes = nodeExit.transition()
			.duration(500)
			.attr("transform", function(d) {
				var x = source.x - 20;
				return "translate(" + source.y + "," + x + ")";
			})
			.remove();

		exitNodes.select("circle")
			.attr("r", 0);

		exitNodes.select("text")
			.style("fill-opacity", 0);

		var linkUpdate = svg.selectAll(".link")
			.data(links, function(d) {
				return d.target.name;
			});
		var linkEnter = linkUpdate.enter();
		var linkExit = linkUpdate.exit();

		linkEnter.insert("path", ".node")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.transition()
			.duration(500)
			.attr("d", diagonal);

		linkUpdate.transition()
			.duration(500)
			.attr("d", diagonal);

		linkExit.transition()
			.duration(500)
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.remove();

		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});

	}

	function toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}
}

maketreechart(hot_json,3);