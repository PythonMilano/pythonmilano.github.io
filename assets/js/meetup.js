/*
	Fetch data from meetup.com API
	pythonmilano.xyz | @cstrap
	Credits: http://stackoverflow.com/a/1176810/1430290
*/

var query = "select json.name, json.time, yes_rsvp_count, json.link from json where url=";
var query_current = query + "'https://api.meetup.com/Python-Milano/events/'";
var query_past = query + "'https://api.meetup.com/Python-Milano/events/?status=past'";

function YQLQuery(query, callback) {
    this.query = query;
    this.callback = callback || function(){};
    this.fetch = function() {
		if (!this.query || !this.callback) {
			throw new Error('YQLQuery.fetch(): Parameters may be undefined');
		}
		var scriptEl = document.createElement('script'),
			uid = 'yql' + +new Date(),
			encodedQuery = encodeURIComponent(this.query.toLowerCase()),
			instance = this;
		YQLQuery[uid] = function(json) {
			instance.callback(json);
			delete YQLQuery[uid];
			document.body.removeChild(scriptEl);
		};
		scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q=' + encodedQuery + '&format=json&callback=YQLQuery.' + uid; 
		document.body.appendChild(scriptEl);
    };
}

function get_event(payload) {
	if (!payload.query.results) {
		var pastEvents = new YQLQuery(query_past, get_event);
		pastEvents.fetch();
		return;
	}
	var obj = payload.query.results.json.slice(-1)[0].json;
	var date = new Date(parseInt(obj.time));
	var month = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE']
	result = {
		'topic': obj.name,
		'day': date.getDate(),
		'month': month[date.getMonth()],
		'link': obj.link,   
	}
	$('#topic').text(result.topic);
	$('#day').text(result.day);
	$('#month').text(result.month);
	$('#meetup_link').attr('href', result.link);
};

var currentEvent = new YQLQuery(query_current, get_event);
currentEvent.fetch();
