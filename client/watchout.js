// start slingin' some d3 here.
/*
Basic requirements:

 Make a differently-colored dot to represent the player. Make it draggable.
 Detect when a enemy touches you.
 Keep track of the user's score, and display it.
 Use css3 animations to make the enemies whirling shuriken.

*/

/*
*/
d3.select("body") //creating

var svgContainer = d3.select("body").append("svg")
		.attr("width", 3000)
		.attr("height", 3000);

var createEnemies = function(){
	// var dot = d3.select("body").append('g')
	// 	.attr('string',"dot").selectAll('circle')//.data([10,10])
	// 	.enter().append('circle')
	// 	.attr('r',5)
	// 	.attr('cx',function(d){return d.x})
	// 	.attr('cy',function(d){return d.y})
	// 	.call(drag);

	var enemyArray = [];
	
	for(var i = 0; i < 30; i++){
		//this number is positioning
		enemyArray.push(800);
	}

	//this is the dimensions of the gameboard

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


	//this is the dimensions of the gameboard
	// var svgContainer = d3.select("body").append("svg")
	// 	.attr("width", 3000)
	// 	.attr("height", 3000);

	//creating the existance of the circles, and appends them to the DOM
	var circles = svgContainer.selectAll("circle")
		.data([800])
		.enter()
		.append("circle");

		// var circle = box.selectAll('.draggableCircle')  
		//                 .data([{ x: (boxWidth / 2), y: (boxHeight / 2), r: 25 }])
		//                 .enter()
		//                 .append('svg:circle')
		//                 .attr('class', 'draggableCircle')
		//                 .attr('cx', function(d) { return d.x; })
		//                 .attr('cy', function(d) { return d.y; })
		//                 .attr('r', function(d) { return d.r; })
		//                 .call(drag)
		//                 .style('fill', 'black');

		// //this styles the circles and give them a position
	var circleAttributes = circles
		.attr("cx", function(d){return d;})
		.attr("cy", function(d){return d;})
		.attr("class","draggableCircle")
		.attr("r", 10) 
		.style("fill", "red")
		// .call(drag);                        


		var drag = d3.behavior.drag()
			         // .origin(function(d) { return d; })
		             .on('dragstart', dragstarted)
		             .on('drag', dragged)
		             // .attr('y', d3.event.y); })
		             .on('dragend', dragended);

		function dragstarted(d){ 
			d3.event.sourceEvent.stopPropagation(); 
		 	d3.select(this).classed('dragging',true);
		}

		function dragged(d){
			d3.select(this)
				.attr('cx',d.x = d3.event.d.x)
				.attr('cy',d.y = d3.event.d.y)
		}

		function dragended(d){
			d3.select(this).classed('dragging',false)
		}

	circles.on("click", function() {
  	if (d3.event.defaultPrevented) return; // click suppressed
  	console.log("clicked!");
});	

	circles.call(drag);

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

//console.log('enemyArray',circles);
player();
createEnemies();
// player().drag();
//transitions();
setInterval(transitions, 1000);


// claire();
