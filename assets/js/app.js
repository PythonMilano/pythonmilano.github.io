var groupDetails = {
    group_urlname: "Python-Milano"
};
getEventData = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=" + groupDetails.group_urlname + "&photo-host=public&page=1&fields=&order=time&desc=false&status=upcoming&sig_id=99027442&sig=a0e7723a75144f7a1becb1f5f529a0313cd32374";

function getMonth(time) {
    return "MESE"
}
function getDay(time) {
    return "00"
}
$(document).ready(function () {
    $.getJSON(getEventData, function (data) {
        console.log(data)
    }).done(function (data) {
        if (data.status && data.status.match(/^200/) == null) {
            alert(data.status + ": " + data.details);
        } else {
            if (data.results.length == 0) {
                $("#month").text(" ");
                $('#day').text(" ");
                $('#event-title').text("Nessun nuovo evento in programma");
                $('#partecipate-button').text("Proponine Uno!").attr('href', 'https://trello.com/b/0BEDDL3K/argomenti-incontri');
            } else {
                var event = data.results[0];
                $("#month").text(getMonth(event.time));
                $('#day').text(getDay(event.time));
                $('#event-title').text(event.name);
                $('#partecipate-button').text("Partecipa!").attr('href', event.event_url);
            }
        }
    });
});