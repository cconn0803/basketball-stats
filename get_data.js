d3.csv("test.csv", function(error, data) {
	
	if (error) {
    	console.log(error);
    	throw error;
    }

    console.log(data[0]);
    console.log(data[1]);

    var team1data = data[0];
    var team2data = data[1];

    // stuff for box at top
    var team1name = document.getElementById("team-one-name");
	var team1year = document.getElementById("team-one-year");
    var team1points = document.getElementById("team-one-points");
    var team1fg = document.getElementById("team-one-fg");

    var team2name = document.getElementById("team-two-name");
    var team2year = document.getElementById("team-two-year");
    var team2points = document.getElementById("team-two-points");
    var team2fg = document.getElementById("team-two-fg");

    team1name.textContent = team1data.Team;
    team1year.textContent = "Season: " + team1data.Season;
    team1points.textContent = "Total Points: " + team1data.PTS;
    team1fg.textContent = "FG%: " + team1data.FG;

    team2name.textContent = team2data.Team;
    team2year.textContent = "Season: " + team2data.Season;
    team2points.textContent = "Total Points: " + team2data.PTS;
    team2fg.textContent = "FG%: " + team2data.FG;

    // box above court for displaying stats
    var statDisplay = document.getElementById("stat-display");
    var statTeamDisplay = document.getElementById("stat-team-name");
    
    // elements of team 1 court (left side)
    var team1three = document.getElementById("team-one-three");
    var team1two = document.getElementById("team-one-two");
    var team1ft = document.getElementById("team-one-ft");
   	
   	// elements of team 2 court (right side)
    var team2three = document.getElementById("team-two-three");
    var team2two = document.getElementById("team-two-two");
    var team2ft = document.getElementById("team-two-ft");

    // default text display
    statTeamDisplay.textContent = "Hover over an element";
    statDisplay.textContent = "to see a stat";

    // Team 1 hover events
    team1three.onmouseover = function() {
    	statTeamDisplay.textContent = team1data.Team;
    	statDisplay.textContent = team1data.threeP;
    	console.log(team1data.threeP);
    }
    team1two.onmouseover = function() {
    	statTeamDisplay.textContent = team1data.Team;
    	statDisplay.textContent = team1data.twoP;
    	console.log(team1data.twoP);
    }
    team1ft.onmouseover = function() {
    	statTeamDisplay.textContent = team1data.Team;
    	statDisplay.textContent = team1data.FT;
    	console.log(team1data.FT);
    }

    // Team 2 hover events
    team2three.onmouseover = function() {
    	statTeamDisplay.textContent = team2data.Team;
    	statDisplay.textContent = team2data.threeP;
    	console.log(team2data.threeP);
    }
    team2two.onmouseover = function() {
    	statTeamDisplay.textContent = team2data.Team;
    	statDisplay.textContent = team2data.twoP;
    	console.log(team2data.twoP);
    }
    team2ft.onmouseover = function() {
    	statTeamDisplay.textContent = team2data.Team;
    	statDisplay.textContent = team2data.FT;
    	console.log(team2data.FT);
    }



});