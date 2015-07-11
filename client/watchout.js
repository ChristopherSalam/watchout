/* Basic requirements:
 Make a differently-colored dot to represent the player. Make it draggable.
 Detect when a enemy touches you.
 Keep track of the user's score, and display it.
 Use css3 animations to make the enemies whirling shuriken.
*/
var dragended, dragstarted, dragged;
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
	d3.select(this)
		// .attr("cx", function(d){return d;})
		// .attr("cy", function(d){return d;})
		.attr('cx',d.x = d3.event.x)
		.attr('cy',d.y = d3.event.y)
	}


function dragended(d){
	d3.select(this).classed('dragging',false)
}


var createEnemies = function(){
	var enemyArray = [];	
	for(var i = 0; i < 30; i++){
		//this number is positioning
		enemyArray.push(600);
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
		.attr("r", 10) /*this is the radius of the enemy circles*/
		.style("fill", "black")
		.attr("class", "enemies");                        
};


var player = function(){
	//creating the existance of the circles, and appends them to the DOM
	var circles = svgContainer.selectAll("circle")
		.data([600])
		.enter()
		.append("circle");
	//this styles the circles and give them a position
	var circleAttributes = circles
		.attr("cx", function(d){return d;})
		.attr("cy", function(d){return d;})
		.attr("class","draggableCircle")
		.attr("r", 10) 
		.style("fill", "red")
		.call(drag);                        



	//circles.on("", function(){})

	//var draggableCircle = svgContainer.selectAll("draggableCircle");

	//circles.on("click", function() {
  	// if (d3.event.defaultPrevented) return; // click suppressed
  	// console.log("clicked!");
//});	

};

var transitions = function(){
//this moves the circles from their current location to a new location over a specificed amount of time
	d3.selectAll(".enemies").transition()
		.attr("cx", function(d){return d * Math.random() * 1.7;})
		.attr("cy", function(d){return d * Math.random();})
		.duration(500)
		//.delay()
		// .each("end", "repeat");
};

player();
createEnemies();
//transitions();
setInterval(transitions, 1000);
