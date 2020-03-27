$(document).on('click', '#update', function(sel) {
    var ambitoChoosen = $('#ambito').find(':selected').val();
    var campoChoosen = $('#campo').find(':selected').text();
    var isIncrement = $('#increment').prop('checked');

    if (ambitoChoosen == 'nazionale')
        addChartData(
            createPoints(covidData[ambitoChoosen], campoChoosen, isIncrement), 
            campoChoosen + "_nazionale" + ((isIncrement) ? "_increment" : "")
        );

    else if (ambitoChoosen == 'regioni') {
        var regioneChoosen = $('#regioneSelect').find(':selected').val()
        addChartData(
            createPoints(covidData[ambitoChoosen][regioneChoosen], campoChoosen, isIncrement), 
            campoChoosen + "_" + regioneChoosen + ((isIncrement) ? "_increment" : "")
        );
    }

    else if (ambitoChoosen == 'province') {
        var provinciaChoosen = $('#provinciaSelect').find(':selected').val();
        addChartData(
            createPoints(covidData[ambitoChoosen][provinciaChoosen], campoChoosen, isIncrement),
            campoChoosen + "_" + provinciaChoosen + ((isIncrement) ? "_increment" : "")
        );
    }
});

var fillCampo = function(arr) {
    //first, get all objects fields
    keys = Object.keys(arr[0]);

    $('#campo').empty();

    keys.forEach(element => {
        $('<option/>').val(element).html(element).appendTo('#campo');
    });
}

$(document).on('change', '#ambito', function(ambito) {
    var ambito = $('#ambito').find(':selected').val();

    if (ambito == 'regioni') {
        $('#regioneChooser').show();
        $('#provinciaChooser').hide();
        fillCampo(covidData.regioni.Abruzzo);
    }
    else if (ambito == 'province') {
        $('#provinciaChooser').show();
        $('#regioneChooser').hide();
        fillCampo(covidData.province.Chieti);
    }
    else if (ambito == 'nazionale') {
        $('#provinciaChooser').hide();
        $('#regioneChooser').hide();
        fillCampo(covidData.nazionale);
    }
    
});

var fillRegioni = function() {
    keys = Object.keys(covidData.regioni);

    keys.forEach(element => {
        $('<option/>').val(element).html(element).appendTo('#regioneSelect');
    });
}

var fillProvince = function() {
    keys = Object.keys(covidData.province);

    keys.forEach(element => {
        $('<option/>').val(element).html(element).appendTo('#provinciaSelect');
    });
}