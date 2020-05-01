var d1 ={
	"Team": "Milwaukee Bucks",
	"Season": "2018-2019",
	"FG": "0.476",
	"threeP": "0.353",
	"twoP": "0.565",
	"FT": "0.773",
	"PTS": "118.1"
};
var d2 = {
	"Team": "Golden State Warriors",
	"Season": "2018-2019",
	"FG": "0.491",
	"threeP": "0.385",
	"twoP": "0.557",
	"FT": "0.801",
	"PTS": "117.7"
};
window.addEventListener('load', function () {
	displayData(d1, d2);
})


function resetData() {

	var y1 = document.getElementById("dropdownMenuLink1").textContent;
	var t1 = $('#select1').text();
	var y2 = document.getElementById("dropdownMenuLink3").textContent;
	var t2 = $('#select2').text();

	d3.csv("NBA_data.csv", function(error, data) {
		
		if (error) {
	    	console.log(error);
	    	throw error;
	    }

	    var data1 = d1;
	    var data2 = d2;
	    for (var i=0; i<data.length; i++){

	    	var currYear = data[i].Season;
	    	var currTeam = data[i].Team;

	    	if( currYear == y1 && currTeam == t1 ) {
	    		data1 = data[i];
	    	}
	    	if( currYear == y2 && currTeam == t2 ) {
	    		data2 = data[i];
	    	}

	    }
	    displayData(data1, data2);

	});

}

function displayData(data1, data2) {
	
	console.log(data1);
	console.log(data2);

	var team1data = data1;
	var team2data = data2;

	var defaultHeader = team1data.Team + " | " + team2data.Team;
	var defaultHover = "Hover over a section to see a stat.";

	// stuff for box at top
	$("#team-one-name").text(team1data.Team);
	$("#team-one-year").text("Season: " + team1data.Season);
	$("#team-one-points").text("Points per Game: " + team1data.PTS);
	$("#team-one-fg").text("Field Goal: " + ((+team1data.FG)*100).toFixed(2) + "%");

	$("#team-two-name").text(team2data.Team);
	$("#team-two-year").text("Season: " + team2data.Season);
	$("#team-two-points").text("Points per Game: " + team2data.PTS);
	$("#team-two-fg").text("Field Goal: " + ((+team2data.FG)*100).toFixed(2) + "%");

	// default text display
	$("#stat-team-name").text(defaultHeader);
	$("#stat-display").text(defaultHover);

	// D3 format is to put a '+' in front to change an element into a number
	// to convert to a percentage: ((+element)*100) + "%"

	// flags for hover events
	var twoFlag1 = false;
	var ftFlag1 = false;
	var twoFlag2 = false;
	var ftFlag2 = false;  

	// Team 1 hover functions
	$("#team-one-three")
		.mouseover(function() {
			if( !twoFlag1 ){
				teamOneColors("grey", "white", "white");

	    		$("#stat-team-name").text(team1data.Team);
	    		$("#stat-display").text("Three-Point: " + ((+team1data.threeP)*100).toFixed(2) + "%");
	    	}
	   	})
	   	.mouseleave(function() {
	   		//reset everything back to default
	   		backToDefault();
	   	});

	$("#team-one-two")
	    .mouseover(function() {
	    	if( !ftFlag1 ){
	    		twoFlag1 = true;

	    		teamOneColors("white", "grey", "white");

		    	$("#stat-team-name").text(team1data.Team);
		    	$("#stat-display").text("Two-Point: " + ((+team1data.twoP)*100).toFixed(2) + "%");
		    }
	    })
	    .mouseleave(function() {
	    	twoFlag1 = false;
	   	});

	$("#team-one-ft")
	    .mouseover(function() {
	    	twoFlag1 = true;
	    	ftFlag1 = true;

	    	teamOneColors("white", "white", "grey");

		    $("#stat-team-name").text(team1data.Team);
		    $("#stat-display").text("Free-Throw: " + ((+team1data.FT)*100).toFixed(2) + "%");
	   	})
	   	.mouseleave(function() {
	   		ftFlag1 = false;
	   	});


	// Team 2 hover functions
	$("#team-two-three")
	    .mouseover(function() {
	    	if( !twoFlag2 ){
	    		teamTwoColors("grey", "white", "white");

		       	$("#stat-team-name").text(team2data.Team);
		    	$("#stat-display").text("Three-Point: " + ((+team2data.threeP)*100).toFixed(2) + "%");
		    }
	    })
	    .mouseleave(function() { 
	    	//reset everything back to default
	    	backToDefault();
	   	});

	$("#team-two-two")
	    .mouseover(function() {
	    	if( !ftFlag2 ){
	    		twoFlag2 = true;

	    		teamTwoColors("white", "grey", "white");

		    	$("#stat-team-name").text(team2data.Team);
		    	$("#stat-display").text("Two-Point: " + ((+team2data.twoP)*100).toFixed(2) + "%");
		    }
	    })
	    .mouseleave(function() {
	   		twoFlag2 = false;
	   	});

	$("#team-two-ft")
	    .mouseover(function() {
	    	ftFlag2 = true;
	    	twoFlag2 = true;

	    	teamTwoColors("white", "white", "grey");

		    $("#stat-team-name").text(team2data.Team);
		    $("#stat-display").text("Free-Throw: " + ((+team2data.FT)*100).toFixed(2) + "%");
	    })
	    .mouseleave(function() {
	   		ftFlag2 = false;
	   	});


	function teamOneColors(three, two, ft){
		$("#team-one-three").css("background-color", three);
		$("#team-one-two").css("background-color", two);
		$("#team-one-ft").css("background-color", ft);
	}
	function teamTwoColors(three, two, ft){
		$("#team-two-three").css("background-color", three);
		$("#team-two-two").css("background-color", two);
		$("#team-two-ft").css("background-color", ft);
	}

	  	
	function backToDefault(){
		twoFlag1 = false;
		ftFlag1 = false;
		twoFlag2 = false;
		ftFlag2 = false;

	  	$("#stat-team-name").text(defaultHeader);
	    $("#stat-display").text(defaultHover);
			
		$("#team-one-three").css("background-color", "white");
	    $("#team-one-two").css("background-color", "white");
	    $("#team-one-ft").css("background-color", "white");

	   	$("#team-two-three").css("background-color", "white");
	    $("#team-two-two").css("background-color", "white");
	    $("#team-two-ft").css("background-color", "white");
	}	

	
}

function loadDropdownT1(year){

	// set year menu text
	document.getElementById("dropdownMenuLink1").textContent = year;

	// clear team menu
	const myNode =  document.getElementById("t1-menu-team");
 		while (myNode.firstChild) {
    	myNode.removeChild(myNode.lastChild);
	}

	$('#select1').text("Select a Team");

	// load new menu with correct teams
	d3.csv("NBA_data.csv", function(error, data) {
		
		if (error) {
	    	console.log(error);
	    	throw error;
	    }

	    for (var i=0; i<data.length; i++){
	    	if(data[i].Season == year) {
	    		var t1MenuTeam = $("#t1-menu-team");
	    		var elementToAdd = "<a class=\"dropdown-item drop-switch\" href=\"#\">" + data[i].Team + "</a>";
	    		t1MenuTeam.append(elementToAdd);
	    	}
	    }

	    // set text of team dropdown to selection
	    $('.team-drop a').click(function(){
    		$('#select1').text($(this).text());
  		});

	});

}

function loadDropdownT2(year){
	
	// set year menu text
	document.getElementById("dropdownMenuLink3").textContent = year;

	// clear team menu
	const myNode =  document.getElementById("t2-menu-team");
 		while (myNode.firstChild) {
    	myNode.removeChild(myNode.lastChild);
	}
	$('#select2').text("Select a Team");

	// load new menu with correct teams
	d3.csv("NBA_data.csv", function(error, data) {
		
		if (error) {
	    	console.log(error);
	    	throw error;
	    }

	    for (var i=0; i<data.length; i++){
	    	if(data[i].Season == year) {
	    		var t2MenuTeam = $("#t2-menu-team");
	    		var elementToAdd = "<a class=\"dropdown-item drop-switch\" href=\"#\">" + data[i].Team + "</a>";
	    		t2MenuTeam.append(elementToAdd);
	    	}
	    }
	    
	    // set text of team dropdown to selection
	    $('.team-drop a').click(function(){
    		$('#select2').text($(this).text());
  		});

	});

}