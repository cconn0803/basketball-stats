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
    $("#team-one-points").text("Points per Game: " + team1data.PTS);
    $("#team-one-fg").text("Field Goal%: " + ((+team1data.FG)*100).toFixed(2) + "%");

    $("#team-two-name").text(team2data.Team);
    $("#team-two-year").text("Season: " + team2data.Season);
    $("#team-two-points").text("Points per Game: " + team2data.PTS);
    $("#team-two-fg").text("Field Goal%: " + ((+team2data.FG)*100).toFixed(2) + "%");

    // default text display
    $("#stat-team-name").text(team1data.Team + " vs " + team2data.Team);
    $("#stat-display").text("hover over a section to see a stat");

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

  		$("#stat-team-name").text(team1data.Team + " vs " + team2data.Team);
    	$("#stat-display").text("hover over a section to see a stat");
		
		$("#team-one-three").css("background-color", "white");
    	$("#team-one-two").css("background-color", "white");
    	$("#team-one-ft").css("background-color", "white");

   		$("#team-two-three").css("background-color", "white");
    	$("#team-two-two").css("background-color", "white");
    	$("#team-two-ft").css("background-color", "white");
  	}	

});