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
    $("#team-one-name").text(team1data.Team);
    $("#team-one-year").text("Season: " + team1data.Season);
    $("#team-one-points").text("Total Points: " + team1data.PTS);
    $("#team-one-fg").text("FG%: " + team1data.FG);

    $("#team-two-name").text(team2data.Team);
    $("#team-two-year").text("Season: " + team2data.Season);
    $("#team-two-points").text("Total Points: " + team2data.PTS);
    $("#team-two-fg").text("FG%: " + team2data.FG);

    // default text display
    $("#stat-team-name").text("Hover over an element");
    $("#stat-display").text("to see a stat");

    // D3 format is to put a '+' in front to change an element into a number
    // to convert to a percentage: ((+element)*100) + "%"

    var eventCount = 0;

    // Team 1 hover functions
    $("#team-one-three")
    	.mouseover(function() {
    		eventCount++;
    		$("#stat-team-name").text(team1data.Team);
    		$("#stat-display").text("Three-Point: " + ((+team1data.threeP)*100) + "%");
    		console.log(eventCount+ " Three-Point: " + ((+team1data.threeP)*100) + "%");
   		});
    $("#team-one-two")
    	.mouseover(function() {
			eventCount++;
    		$("#stat-team-name").text(team1data.Team);
    		$("#stat-display").text("Two-Point: " + ((+team1data.twoP)*100) + "%");
    		console.log(eventCount+" Two-Point: " + ((+team1data.twoP)*100) + "%");
    	});
    $("#team-one-ft")
    	.mouseover(function() {
    		eventCount++;
    		$("#stat-team-name").text(team1data.Team);
    		$("#stat-display").text("Free-Throw: " + ((+team1data.FT)*100) + "%");
    		console.log(eventCount+" Free-Throw: " + ((+team1data.FT)*100) + "%");
   		});

    // Team 2 hover functions
    $("#team-two-three")
    	.mouseover(function() {
    		eventCount++;
       		$("#stat-team-name").text(team2data.Team);
    		$("#stat-display").text("Three-Point: " + ((+team2data.threeP)*100) + "%");
    		console.log(eventCount+" Three-Point: " + ((+team2data.threeP)*100) + "%");
    	});

    $("#team-two-two")
    	.mouseover(function() {
    		eventCount++;
    		$("#stat-team-name").text(team2data.Team);
    		$("#stat-display").text("Two-Point: " + ((+team2data.twoP)*100) + "%");
    		console.log(eventCount+" Two-Point: " + ((+team2data.twoP)*100) + "%");
    	});
    $("#team-two-ft")
    	.mouseover(function() {
    		eventCount++;
	    	$("#stat-team-name").text(team2data.Team);
	    	$("#stat-display").text("Free-Throw: " + ((+team2data.FT)*100) + "%");
	    	console.log(eventCount+" Free-Throw: " + ((+team2data.FT)*100) + "%");
    	});	

});