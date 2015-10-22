$(document).ready(function(){
    var motti = [ 
        "La pyBissa de Milan",
        "Il serpent[1] di Milano",
        "Python Milano's Flying Cathedral",
        "Il secondo serpente di Milano, dopo il biscione",
        ];

    var motto = motti[Math.floor(Math.random() * motti.length)];
    
    $('#motto').text('"""' + motto + '"""');

});
