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
// the event was triggered here by modifying d3.event.d.x to d3.event.x
		.attr('cx',d.x = d3.event.x)
		.attr('cy',d.y = d3.event.y)
		// .attr('r',d.r = d3.event.r)
		// console.log('x & y of player',d3.event.x,d3.event.y,100);
		// console.log('x and y of enemies',
		// // // can not determine individual dot information for each enemy	
		//  	d3.select(".enemies").attr("cx"),
		//  	d3.select(".enemies").attr("cy"),
		//  	d3.select(".enemies").attr("r")
		//  );
		//console.log("secondball",d3.select(".enemies").attr("r"));
	// var collision = function () {
		console.log('d3.event ', d3.event);		

		// console.log('if statement ', 
		// d3.select(".enemies").attr("cx") + radius + d3.select(".enemies").attr("r") );
			// + radius + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cx") 
			// 	&& d3.event.x < d3.select(".enemies").attr("cx") + radius + d3.select(".enemies").attr("r")
			// 	&& d3.event.y + radius + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cy")
			// 	&& d3.event.y < d3.select(".enemies").attr("cy") + radius + d3.select(".enemies").attr("r"))


		if ((d3.event.x + radius + d3.select(".enemies").attr("r")) > (d3.select(".enemies").attr("cx")) 
				&& (d3.event.x) < (d3.select(".enemies").attr("cx") + radius + d3.select(".enemies").attr("r"))
				&& (d3.event.y + radius + d3.select(".enemies").attr("r")) > (d3.select(".enemies").attr("cy"))
				&& (d3.event.y) < (d3.select(".enemies").attr("cy") + radius + d3.select(".enemies").attr("r")))
		// if (d3.event.x + d3.event.r + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cx") 
		// 		&& d3.event.x < d3.select(".enemies").attr("cx") + d3.event.r + d3.select(".enemies").attr("r")
		// 		&& d3.event.y + d3.event.r + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cy")
		// 		&& d3.event.y < d3.select(".enemies").attr("cy") + d3.event.r + d3.select(".enemies").attr("r"))
		{
			console.log("pin point collision");
		}


	// }
	// collision();
		
}

function dragended(d){
	d3.select(this).classed('dragging',false)
}

// var collision = function () {
// 	if (d3.event.x + d3.event.r + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cx") 
// 			&& d3.event.x < d3.select(".enemies").attr("cx") + d3.event.r + d3.select(".enemies").attr("r")
// 			&& d3.event.y + d3.event.r + d3.select(".enemies").attr("r") > d3.select(".enemies").attr("cy")
// 			&& d3.event.y < d3.select(".enemies").attr("cy") + d3.event.r + d3.select(".enemies").attr("r")){
// 		console.log("COLLISIONNNNNNNNNNNNNNN");
// 	}
// }

var createEnemies = function(){
	var enemyArray = [];	
	for(var i = 0; i < 2; i++){
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
		.attr("r", 100) /*this is the radius of the enemy circles*/
		.style("fill", "black")
		.attr("class", "enemies");
		
		// console.log('x and y of enemies',
		// // can not determine individual dot information for each enemy	
		// 	d3.select(".enemies").attr("cx"),
		// 	d3.select(".enemies").attr("cy")
		// );                  
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
		.attr("r", 100) 
		.style("fill", "red")
		.call(drag);                        
};

var transitions = function(){
//this moves the circles from their current location to a new location over a specificed amount of time
		// console.log('x and y of enemies',
		// // can not determine individual dot information for each enemy	
		// 	d3.select(".enemies").attr("cx"),
		// 	d3.select(".enemies").attr("cy")
		// );

	d3.selectAll(".enemies").transition()
		.attr("cx", function(d){return d * Math.random() * 1.7;})
		.attr("cy", function(d){return d * Math.random();})
		.duration(1000)

		//additionally, our data is delayed one step. 

		//console.log('x and y of enemies',
			//d3.select(".enemies")
		//);
};

// this triggers the single red player
player();
// 
createEnemies();
transitions(); // this is a one time function for debugging
//setInterval(transitions, 2000);
//setInterval(collision, 2000);
