$(document).ready(function() {
	var results = document.getElementById("results");
    var unplayed = document.getElementById("unplayed");
    var played = [];
	var dota_account = 0;
    var last_match_id = 0;

	$("#submit").click(function() {
		dota_account = $("#dota_account").val();
		var match_first_page = getMatchHistory("xxxxxxxxxxxxxxxxxxxx", dota_account);

		$.getJSON(getYQLurl(),
		{
			q:      "select * from json where url=\"" + match_first_page + "\"",
			format: "json"
	  	},
	  	function(data) {
	  		console.log(data);
	  		for (var i = 0; i < data.query.results.result.num_results; i++) {
	  			
		  			for (var j = 0; j < data.query.results.result.matches[i].players.length; j++) {
		  				if (data.query.results.result.matches[i].players[j].account_id == dota_account) {
			    			results.innerHTML += data.query.results.result.matches[i].players[j].hero_id + "<br />";
                            played.push(data.query.results.result.matches[i].players[j].hero_id);
			    		}
			    	}
		    	
			}
            if (data.query.results.result.matches.length == 100) {
                last_match_id = data.query.results.result.matches[99].match_id;
            }
            var match_second_page = getMatchHistory("xxxxxxxxxxxxxxxxxxxx", dota_account) + "&start_at_match_id=" + last_match_id;
        
            $.getJSON(getYQLurl(),
		    {
			    q:      "select * from json where url=\"" + match_second_page + "\"",
			    format: "json"
	      	},
	      	function(data) {
                console.log(data);
                for (var i = 0; i < data.query.results.result.num_results; i++) {
                    
                        for (var j = 0; j < data.query.results.result.matches[i].players.length; j++) {
                            if (data.query.results.result.matches[i].players[j].account_id == dota_account) {
                                results.innerHTML += data.query.results.result.matches[i].players[j].hero_id + "<br />";
                                played.push(data.query.results.result.matches[i].players[j].hero_id);
                            }
                        }
                    
                }
                
                played.sort(function(a,b){return a-b});
                var uniquePlayed = [];
                var found = false;
                $.each(played, function(i, el){
                    if($.inArray(el, uniquePlayed) === -1) uniquePlayed.push(el);
                });
                for (var i = 0; i < heroes.heroes.length; i++) {
                    for (var j = 0; j < uniquePlayed.length; j++) {
                        if (heroes.heroes[i].id == uniquePlayed[j]) {
                            found = true;
                        }
                    }
                    if (found == false) {
                        unplayed.innerHTML += heroes.heroes[i].name + "<br />";
                    } else {
                        found = false;
                    }
                }
            }
            );
	  	}
		);
        
	});

});
