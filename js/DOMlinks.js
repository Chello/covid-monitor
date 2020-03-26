$(document).on('click', '#update', function(sel) {
    if ($('#ambito').find(':selected').val() == 'nazionale')
        createChart(
            createPoints(
                covidData[$('#ambito').find(':selected').val()], 
                $('#campo').find(':selected').text()
            ), 
            $('#campo').find(':selected').text()
        );

    else if ($('#ambito').find(':selected').val() == 'regioni')
        createChart(
            createPoints(
                covidData[$('#ambito').find(':selected').val()][$('#regioneSelect').find(':selected').val()], 
                $('#campo').find(':selected').text()
            ), 
            $('#campo').find(':selected').text()
        );

    else if ($('#ambito').find(':selected').val() == 'province')
        createChart(
            createPoints(
                covidData[$('#ambito').find(':selected').val()][$('#provinciaSelect').find(':selected').val()], 
                $('#campo').find(':selected').text()
            ), 
            $('#campo').find(':selected').text()
        );
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