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
                            played.push(data.query.results.result.matches[i].players[j].hero_id);
                        }
                    }
                }
                
                var uniquePlayed = getUniqueHeroes(played);
                var found = false;
                
                for (var i = 0; i < heroes.heroes.length; i++) {
                    for (var j = 0; j < uniquePlayed.length; j++) {
                        if (heroes.heroes[i].id == uniquePlayed[j]) {
                            found = true;
                            results.innerHTML += heroes.heroes[i].localized_name + "<br />";
                        }
                    }
                    if (found == false) {
                        unplayed.innerHTML += heroes.heroes[i].localized_name + "<br />";
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
