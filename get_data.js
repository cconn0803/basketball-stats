var t1_index = 0;
var t2_index = 1;

displayData();

function resetData(){
	t1_index = t1_index == 0 ? 2:0;
	t2_index = t2_index == 1 ? 3:1;
	console.log("t1_index: " + t1_index);
	console.log("t2_index: " + t2_index);
	displayData();
}

function displayData() {
	d3.csv("test.csv", function(error, data) {
		
		if (error) {
	    	console.log(error);
	    	throw error;
	    }

	    console.log(data[t1_index]);
	    console.log(data[t2_index]);

	    var team1data = data[t1_index];
	    var team2data = data[t2_index];

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

	});
}

function loadDropdownT1(year){

	// set year menu text
	document.getElementById("dropdownMenuLink1").textContent = year;

	// clear team menu
	const myNode =  document.getElementById("t1-menu-team");
 		while (myNode.firstChild) {
    	myNode.removeChild(myNode.lastChild);
	}

	// load new menu with correct teams
	d3.csv("NBA_data.csv", function(error, data) {
		
		if (error) {
	    	console.log(error);
	    	throw error;
	    }

	    for (var i=0; i<data.length; i++){
	    	if(data[i].Season == year) {
	    		console.log("season = year");
	    		var t1MenuTeam = $("#t1-menu-team");
	    		teamAdder(t1MenuTeam, data[i].Team, true);
	    	}
	    }

	});

}

function loadDropdownT2(year){
	


}

// domElement is menu to add to, teamName is just the team name, and teamOne is a flag (if false, its team 2)
function teamAdder(domElement, teamName, teamOne){

	switch(teamName) {
		case "Milwaukee Bucks":
			teamOne ? domElement.append(t1_bucks) : domElement.append(t2_bucks);
			break;
		case "Golden State Warriors":
			teamOne ? domElement.append(t1_war) : domElement.append(t2_war);
			break;
		case "New Orleans Pelicans":
			teamOne ? domElement.append(t1_pel) : domElement.append(t2_pel);
			break;
		case "Philadelphia 76ers":
			teamOne ? domElement.append(t1_76) : domElement.append(t2_76);
			break;
		case "Los Angeles Clippers":
			teamOne ? domElement.append(t1_clip) : domElement.append(t2_clip);
			break;
		case "Portland Trail Blazers":
			teamOne ? domElement.append(t1_blaz) : domElement.append(t2_blaz);
			break;
		case "Oklahoma City Thunder":
			teamOne ? domElement.append(t1_thun) : domElement.append(t2_thun);
			break;
		case "Toronto Raptors":
			teamOne ? domElement.append(t1_rap) : domElement.append(t2_rap);
			break;
		case "Sacramento Kings":
			teamOne ? domElement.append(t1_kings) : domElement.append(t2_kings);
			break;
		case "Washington Wizards":
			teamOne ? domElement.append(t1_wiz) : domElement.append(t2_wiz);
			break;
		case "Houston Rockets":
			teamOne ? domElement.append(t1_rock) : domElement.append(t2_rock);
			break;
		case "Atlanta Hawks":
			teamOne ? domElement.append(t1_hawks) : domElement.append(t2_hawks);
			break;
		case "Minnesota Timberwolves":
			teamOne ? domElement.append(t1_tim) : domElement.append(t2_tim);
			break;
		case "Boston Celtics":
			teamOne ? domElement.append(t1_celt) : domElement.append(t2_celt);
			break;
		case "Brooklyn Nets":
			teamOne ? domElement.append(t1_bnets) : domElement.append(t2_bnets);
			break;
		case "Los Angeles Lakers":
			teamOne ? domElement.append(t1_lake) : domElement.append(t2_lake);
			break;
		case "Utah Jazz":
			teamOne ? domElement.append(t1_jazz) : domElement.append(t2_jazz);
			break;
		case "San Antonio Spurs":
			teamOne ? domElement.append(t1_spurs) : domElement.append(t2_spurs);
			break;
		case "Charlotte Hornets":
			teamOne ? domElement.append(t1_chhorn) : domElement.append(t2_chhorn);
			break;
		case "Denver Nuggets":
			teamOne ? domElement.append(t1_nugg) : domElement.append(t2_nugg);
			break;
		case "Dallas Mavericks":
			teamOne ? domElement.append(t1_mavs) : domElement.append(t2_mavs);
			break;
		case "Indiana Pacers":
			teamOne ? domElement.append(t1_pacer) : domElement.append(t2_pacer);
			break;
		case "Phoenix Suns":
			teamOne ? domElement.append(t1_suns) : domElement.append(t2_suns);
			break;
		case "Orlando Magic":
			teamOne ? domElement.append(t1_magic) : domElement.append(t2_magic);
			break;
		case "Detroit Pistons":
			teamOne ? domElement.append(t1_pist) : domElement.append(t2_pist);
			break;
		case "Miami Heat":
			teamOne ? domElement.append(t1_heat) : domElement.append(t2_heat);
			break;
		case "Chicago Bulls":	
			teamOne ? domElement.append(t1_bulls) : domElement.append(t2_bulls);
			break;
		case "New York Knicks":
			teamOne ? domElement.append(t1_knicks) : domElement.append(t2_knicks);
			break;
		case "Cleveland Cavaliers":
			teamOne ? domElement.append(t1_cavs) : domElement.append(t2_cavs);
			break;
		case "Memphis Grizzlies":
			teamOne ? domElement.append(t1_grizz) : domElement.append(t2_grizz);
			break;
		case "League Average":
			teamOne ? domElement.append(t1_avg) : domElement.append(t2_avg);
			break;
		case "Charlotte Bobcats":
			teamOne ? domElement.append(t1_bob) : domElement.append(t2_bob);
			break;
		case "New Orleans Hornets":
			teamOne ? domElement.append(t1_nohorn) : domElement.append(t2_nohorn);
			break;
		case "New Jersey Nets":
			teamOne ? domElement.append(t1_njnets) : domElement.append(t2_njnets);
			break;
		case "Seattle SuperSonics":
			teamOne ? domElement.append(t1_sonic) : domElement.append(t2_sonic);
			break;
		case "Vancouver Grizzlies":
			teamOne ? domElement.append(t1_van) : domElement.append(t2_van);
			break;
	}
}

var t1_bucks = "<a id=\"t1-bucks\" class=\"dropdown-item\" href=\"#\">Milwaukee Bucks</a>";
var t1_war = "<a id=\"t1-war\" class=\"dropdown-item\" href=\"#\">Golden State Warriors</a>";
var t1_pel = "<a id=\"t1-pel\" class=\"dropdown-item\" href=\"#\">New Orleans Pelicans</a>";
var t1_76 = "<a id=\"t1-76\" class=\"dropdown-item\" href=\"#\">Philadelphia 76ers</a>";
var t1_clip = "<a id=\"t1-clip\" class=\"dropdown-item\" href=\"#\">Los Angeles Clippers</a>";
var t1_blaz = "<a id=\"t1-blaz\" class=\"dropdown-item\" href=\"#\">Portland Trail Blazers</a>";
var t1_thun = "<a id=\"t1-thun\" class=\"dropdown-item\" href=\"#\">Oklahoma City Thunder</a>";
var t1_rap = "<a id=\"t1-rap\" class=\"dropdown-item\" href=\"#\">Toronto Raptors</a>";
var t1_kings = "<a id=\"t1-kings\" class=\"dropdown-item\" href=\"#\">Sacramento Kings</a>";
var t1_wiz = "<a id=\"t1-wiz\" class=\"dropdown-item\" href=\"#\">Washington Wizards</a>";
var t1_rock = "<a id=\"t1-rock\" class=\"dropdown-item\" href=\"#\">Houston Rockets</a>";
var t1_hawks = "<a id=\"t1-hawks\" class=\"dropdown-item\" href=\"#\">Atlanta Hawks</a>";
var t1_tim = "<a id=\"t1-tim\" class=\"dropdown-item\" href=\"#\">Minnesota Timberwolves</a>";
var t1_celt = "<a id=\"t1-celt\" class=\"dropdown-item\" href=\"#\">Boston Celtics</a>";
var t1_bnets = "<a id=\"t1-bnets\" class=\"dropdown-item\" href=\"#\">Brooklyn Nets</a>";
var t1_lake = "<a id=\"t1-lake\" class=\"dropdown-item\" href=\"#\">Los Angeles Lakers</a>";
var t1_jazz = "<a id=\"t1-jazz\" class=\"dropdown-item\" href=\"#\">Utah Jazz</a>";
var t1_spurs = "<a id=\"t1-spurs\" class=\"dropdown-item\" href=\"#\">San Antonio Spurs</a>";
var t1_chhorn = "<a id=\"t1-chhorn\" class=\"dropdown-item\" href=\"#\">Charlotte Hornets</a>";
var t1_nugg = "<a id=\"t1-nugg\" class=\"dropdown-item\" href=\"#\">Denver Nuggets</a>";
var t1_mavs = "<a id=\"t1-mavs\" class=\"dropdown-item\" href=\"#\">Dallas Mavericks</a>";
var t1_pacer = "<a id=\"t1-pacer\" class=\"dropdown-item\" href=\"#\">Indiana Pacers</a>";
var t1_suns = "<a id=\"t1-suns\" class=\"dropdown-item\" href=\"#\">Phoenix Suns</a>";
var t1_magic = "<a id=\"t1-magic\" class=\"dropdown-item\" href=\"#\">Orlando Magic</a>";
var t1_pist = "<a id=\"t1-pist\" class=\"dropdown-item\" href=\"#\">Detroit Pistons</a>";
var t1_heat = "<a id=\"t1-heat\" class=\"dropdown-item\" href=\"#\">Miami Heat</a>";
var t1_bulls = "<a id=\"t1-bulls\" class=\"dropdown-item\" href=\"#\">Chicago Bulls</a>";
var t1_knicks = "<a id=\"t1-knicks\" class=\"dropdown-item\" href=\"#\">New York Knicks</a>";
var t1_cavs = "<a id=\"t1-cavs\" class=\"dropdown-item\" href=\"#\">Cleveland Cavaliers</a>";
var t1_grizz = "<a id=\"t1-grizz\" class=\"dropdown-item\" href=\"#\">Memphis Grizzlies</a>";
var t1_avg = "<a id=\"t1-avg\" class=\"dropdown-item\" href=\"#\">League Average</a>";
var t1_bob = "<a id=\"t1-bob\" class=\"dropdown-item\" href=\"#\">Charlotte Bobcats</a>";
var t1_nohorn = "<a id=\"t1-nohorn\" class=\"dropdown-item\" href=\"#\">New Orleans Hornets</a>";
var t1_njnets = "<a id=\"t1-njnets\" class=\"dropdown-item\" href=\"#\">New Jersey Nets</a>";
var t1_sonic = "<a id=\"t1-sonic\" class=\"dropdown-item\" href=\"#\">Seattle SuperSonics</a>";
var t1_van = "<a id=\"t1-van\" class=\"dropdown-item\" href=\"#\">Vancouver Grizzlies</a>";

var t2_bucks = "<a id=\"t2-bucks\" class=\"dropdown-item\" href=\"#\">Milwaukee Bucks</a>";
var t2_war = "<a id=\"t2-war\" class=\"dropdown-item\" href=\"#\">Golden State Warriors</a>";
var t2_pel = "<a id=\"t2-pel\" class=\"dropdown-item\" href=\"#\">New Orleans Pelicans</a>";
var t2_76 = "<a id=\"t2-76\" class=\"dropdown-item\" href=\"#\">Philadelphia 76ers</a>";
var t2_clip = "<a id=\"t2-clip\" class=\"dropdown-item\" href=\"#\">Los Angeles Clippers</a>";
var t2_blaz = "<a id=\"t2-blaz\" class=\"dropdown-item\" href=\"#\">Portland Trail Blazers</a>";
var t2_thun = "<a id=\"t2-thun\" class=\"dropdown-item\" href=\"#\">Oklahoma City Thunder</a>";
var t2_rap = "<a id=\"t2-rap\" class=\"dropdown-item\" href=\"#\">Toronto Raptors</a>";
var t2_kings = "<a id=\"t2-kings\" class=\"dropdown-item\" href=\"#\">Sacramento Kings</a>";
var t2_wiz = "<a id=\"t2-wiz\" class=\"dropdown-item\" href=\"#\">Washington Wizards</a>";
var t2_rock = "<a id=\"t2-rock\" class=\"dropdown-item\" href=\"#\">Houston Rockets</a>";
var t2_hawks = "<a id=\"t2-hawks\" class=\"dropdown-item\" href=\"#\">Atlanta Hawks</a>";
var t2_tim = "<a id=\"t2-tim\" class=\"dropdown-item\" href=\"#\">Minnesota Timberwolves</a>";
var t2_celt = "<a id=\"t2-celt\" class=\"dropdown-item\" href=\"#\">Boston Celtics</a>";
var t2_bnets = "<a id=\"t2-bnets\" class=\"dropdown-item\" href=\"#\">Brooklyn Nets</a>";
var t2_lake = "<a id=\"t2-lake\" class=\"dropdown-item\" href=\"#\">Los Angeles Lakers</a>";
var t2_jazz = "<a id=\"t2-jazz\" class=\"dropdown-item\" href=\"#\">Utah Jazz</a>";
var t2_spurs = "<a id=\"t2-spurs\" class=\"dropdown-item\" href=\"#\">San Antonio Spurs</a>";
var t2_chhorn = "<a id=\"t2-chhorn\" class=\"dropdown-item\" href=\"#\">Charlotte Hornets</a>";
var t2_nugg = "<a id=\"t2-nugg\" class=\"dropdown-item\" href=\"#\">Denver Nuggets</a>";
var t2_mavs = "<a id=\"t2-mavs\" class=\"dropdown-item\" href=\"#\">Dallas Mavericks</a>";
var t2_pacer = "<a id=\"t2-pacer\" class=\"dropdown-item\" href=\"#\">Indiana Pacers</a>";
var t2_suns = "<a id=\"t2-suns\" class=\"dropdown-item\" href=\"#\">Phoenix Suns</a>";
var t2_magic = "<a id=\"t2-magic\" class=\"dropdown-item\" href=\"#\">Orlando Magic</a>";
var t2_pist = "<a id=\"t2-pist\" class=\"dropdown-item\" href=\"#\">Detroit Pistons</a>";
var t2_heat = "<a id=\"t2-heat\" class=\"dropdown-item\" href=\"#\">Miami Heat</a>";
var t2_bulls = "<a id=\"t2-bulls\" class=\"dropdown-item\" href=\"#\">Chicago Bulls</a>";
var t2_knicks = "<a id=\"t2-knicks\" class=\"dropdown-item\" href=\"#\">New York Knicks</a>";
var t2_cavs = "<a id=\"t2-cavs\" class=\"dropdown-item\" href=\"#\">Cleveland Cavaliers</a>";
var t2_grizz = "<a id=\"t2-grizz\" class=\"dropdown-item\" href=\"#\">Memphis Grizzlies</a>";
var t2_avg = "<a id=\"t2-avg\" class=\"dropdown-item\" href=\"#\">League Average</a>";
var t2_bob = "<a id=\"t2-bob\" class=\"dropdown-item\" href=\"#\">Charlotte Bobcats</a>";
var t2_nohorn = "<a id=\"t2-nohorn\" class=\"dropdown-item\" href=\"#\">New Orleans Hornets</a>";
var t2_njnets = "<a id=\"t2-njnets\" class=\"dropdown-item\" href=\"#\">New Jersey Nets</a>";
var t2_sonic = "<a id=\"t2-sonic\" class=\"dropdown-item\" href=\"#\">Seattle SuperSonics</a>";
var t2_van = "<a id=\"t2-van\" class=\"dropdown-item\" href=\"#\">Vancouver Grizzlies</a>";