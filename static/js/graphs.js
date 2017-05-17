var articleChart = AmCharts.makeChart( "article-chart-div", {
	  "type": "radar",
	  "theme": "light",
	  "dataProvider": [ {
	    "voteType": "Up",
	    "votes": 100
	  }, {
	    "voteType": "Right",
	    "votes": 50
	  }, {
	    "voteType": "Down",
	    "votes": 20
	  }, {
	    "voteType": "Left",
	    "votes": 50
	  } ],
	  "valueAxes": [ {
	    "axisTitleOffset": 10,
	    "minimum": 0,
	    "maximum": 100,
	    "axisAlpha": 0.15,
	    "gridAlpha": 0,
	    "gridCount": 0	    
	  } ],
	  "startDuration": 0,
	  "graphs": [ {
	    "balloonText": "[[value]]%",
	    "bullet": "round",
	    "lineThickness": 3,
	    "valueField": "votes"
	  } ],
	  "categoryField": "voteType",
	  "export": {
	    "enabled": false
	  }
	} );

var publisherChart = AmCharts.makeChart( "publisher-chart-div", {
	  "type": "radar",
	  "theme": "light",
	  "dataProvider": [ {
	    "voteType": "Up",
	    "votes": 30
	  }, {
	    "voteType": "Right",
	    "votes": 70
	  }, {
	    "voteType": "Down",
	    "votes": 70
	  }, {
	    "voteType": "Left",
	    "votes": 10
	  } ],
	  "valueAxes": [ {
	    "axisTitleOffset": 10,
	    "minimum": 0,
	    "maximum": 100,
	    "axisAlpha": 0.15,
	    "gridAlpha": 0,
	    "gridCount": 0	    
	  } ],
	  "startDuration": 0,
	  "graphs": [ {
	    "balloonText": "[[value]]%",
	    "bullet": "round",
	    "lineThickness": 3,
	    "valueField": "votes"
	  } ],
	  "categoryField": "voteType",
	  "export": {
	    "enabled": false
	  }
	} );

var journalistChart = AmCharts.makeChart( "journalist-chart-div", {
	  "type": "radar",
	  "theme": "light",
	  "dataProvider": [ {
	    "voteType": "Up",
	    "votes": 100
	  }, {
	    "voteType": "Right",
	    "votes": 80
	  }, {
	    "voteType": "Down",
	    "votes": 60
	  }, {
	    "voteType": "Left",
	    "votes": 80
	  } ],
	  "valueAxes": [ {
	    "axisTitleOffset": 10,
	    "minimum": 0,
	    "maximum": 100,
	    "axisAlpha": 0.15,
	    "gridAlpha": 0,
	    "gridCount": 0	    
	  } ],
	  "startDuration": 0,
	  "graphs": [ {
	    "balloonText": "[[value]]%",
	    "bullet": "round",
	    "lineThickness": 3,
	    "valueField": "votes"
	  } ],
	  "categoryField": "voteType",
	  "export": {
	    "enabled": false
	  }
	} );

