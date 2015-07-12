/* Basic requirements:
 Detect when a enemy touches you.
 Keep track of the user's score, and display it.
*/
var body = d3.select("body")
//this is the dimensions of the gameboard
var svgContainer = d3.select("body").append("svg")
		.attr("width", 3000)
		.attr("height", 3000);

var drag = d3.behavior.drag()
		.on("dragstart",dragstarted)
		.on("drag", dragged)
		.on("dragend", dragended);

function dragstarted(d){ 
	d3.event.sourceEvent.stopPropagation(); 
 	d3.select(this).classed('dragging',true);
}

function dragged(d){
	var radius = 50;
	d3.select(this)
		.attr('cx',d.x = d3.event.x)
		.attr('cy',d.y = d3.event.y)
	if ((d3.event.x + radius + d3.select(".enemies").attr("r")) > (d3.select(".enemies").attr("cx")) 
		&& (d3.event.x) < (d3.select(".enemies").attr("cx") + radius + d3.select(".enemies").attr("r"))
		&& (d3.event.y + radius + d3.select(".enemies").attr("r")) > (d3.select(".enemies").attr("cy"))
		&& (d3.event.y) < (d3.select(".enemies").attr("cy") + radius + d3.select(".enemies").attr("r")))
		{console.log("pin point collision");}
}

function dragended(d){
	d3.select(this).classed('dragging',false)
}

var createEnemies = function(){
	var enemyArray = [];	
	for(var i = 0; i < 30; i++){
	//this number is positioning
		enemyArray.push(300);
	}
	//creating the existance of the circles, and appends them to the DOM
	var circles = svgContainer.selectAll("circle")
		.data(enemyArray)
		.enter()
		.append("circle");
	//this styles the circles and give them a position
	var circleAttributes = circles
		.attr("cx", function(d){return d;})
		.attr("cy", function(d){return d;})
		.attr("r", 5) /*this is the radius of the enemy circles*/
		.style("fill", "black")
		.attr("class", "enemies");              

};

var player = function(){
	//creating the existance of the circles, and appends them to the DOM
	var circles = svgContainer.selectAll("circle")
		.data([300])
		.enter()
		.append("circle");
	//this styles the circles and give them a position
	var circleAttributes = circles
		.attr("cx", function(d){return d;})
		.attr("cy", function(d){return d;})
		.attr("class","draggableCircle")
		.attr("r", 5) 
		.style("fill", "#9900cc")
		.call(drag);                        
};

	var count = 0

var transitions = function(){
    count++; 
	d3.selectAll(".enemies").transition()
		.attr("cx", function(d){return d * Math.random()*2; })
		.attr("cy", function(d){return d * Math.random(); })
		// .attr("cx", function(d,i){return d*.01*i*count})
		// .attr("cy", function(d,i){return d*.01*i*count})
		.ease('back')
		.styleTween("color", function() { return d3.interpolate("blue", "#aaa"); })
		.duration(1000)

	d3.selectAll(".enemies:nth-child(2n)").style("fill","#DD0048")
	d3.selectAll(".enemies:nth-child(3n)").style("fill","#32cd32")
};

// this triggers the single red player
player();
// 
createEnemies();
//transitions(); // this is a one time function for debugging
setInterval(transitions, 2000);
//setInterval(collision, 2000);
