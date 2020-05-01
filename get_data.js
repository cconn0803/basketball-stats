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

	var color1 = teamColor(team1data.Team);
	var color2 = teamColor(team2data.Team);  

	// Team 1 hover functions
	$("#team-one-three")
		.mouseover(function() {
			if( !twoFlag1 ){
				teamOneColors(color1, "white", "white");

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

	    		teamOneColors("white", color1, "white");

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

	    	teamOneColors("white", "white", color1);

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
	    		teamTwoColors(color2, "white", "white");

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

	    		teamTwoColors("white", color2, "white");

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

	    	teamTwoColors("white", "white", color2);

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
	    $('.team-drop-1 a').click(function(){
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
	    $('.team-drop-2 a').click(function(){
    		$('#select2').text($(this).text());
  		});

	});

}

function teamColor(teamName) {
	switch(teamName) {
		case "Milwaukee Bucks":
			return "#054216";
			break;
		case "Golden State Warriors":
			return "#1961B1";
			break;
		case "New Orleans Pelicans":
			return "#B09357";
			break;
		case "Philadelphia 76ers":
			return "#0064AD";
			break;
		case "Los Angeles Clippers":
			return "#E5164B";
			break;
		case "Portland Trail Blazers":
			return "#F1302D";
			break;
		case "Oklahoma City Thunder":
			return "#E95131";
			break;
		case "Toronto Raptors":
			return "#BA062F";
			break;
		case "Sacramento Kings":
			return "#4E2C7B";
			break;
		case "Washington Wizards":
			return "#192D58";
			break;
		case "Houston Rockets":
			return "#BE2030";
			break;
		case "Atlanta Hawks":
			return "#CA1F2C";
			break;
		case "Minnesota Timberwolves":
			return "#04A350";
			break;
		case "Boston Celtics":
			return "#016E3F";
			break;
		case "Brooklyn Nets":
			return "#A6AEAE";
			break;
		case "Los Angeles Lakers":
			return "#F6B428";
			break;
		case "Utah Jazz":
			return "#0B223D";
			break;
		case "San Antonio Spurs":
			return "#808487";
			break;
		case "Charlotte Hornets":
			return "#368295";
			break;
		case "Denver Nuggets":
			return "#1C1D31";
			break;
		case "Dallas Mavericks":
			return "#0079BF";
			break;
		case "Indiana Pacers":
			return "#F7C530";
			break;
		case "Phoenix Suns":
			return "#DE5D1F";
			break;
		case "Orlando Magic":
			return "#2D7CDC";
			break;
		case "Detroit Pistons":
			return "#F60839";
			break;
		case "Miami Heat":
			return "#93012D";
			break;
		case "Chicago Bulls":	
			return "#BE2030";
			break;
		case "New York Knicks":
			return "#F76C0D";
			break;
		case "Cleveland Cavaliers":
			return "#831437";
			break;
		case "Memphis Grizzlies":
			return "#5A72A4";
			break;
		case "League Average":
			return "#00539E";
			break;
		case "Charlotte Bobcats":
			return "#EB6230";
			break;
		case "New Orleans Hornets":
			return "#008BBF";
			break;
		case "New Jersey Nets":
			return "#00265A";
			break;
		case "Seattle SuperSonics":
			return "#005530";
			break;
		case "Vancouver Grizzlies":
			return "#00ADA4";
			break;
	}
}