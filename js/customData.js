var createPoints = function(topic, field, increment = false) {
    var toRet = $.map(topic, function(val) {
        return val[this.field];
    }.bind({field: field}));
    if (!increment) return toRet;
    else return createIncrement(toRet);
}

var createIncrement = function(arr) {
    var toRet = [0];
    for (var i = 1; i < arr.length; i++) {
        toRet[i] = arr[i] - arr[i-1];
    }
    return toRet;
}

//nuovi_attualmente_positivi / tamponi
var tamponi_giornalieri_fract_nuovi_attualmente_positivi = function(arr) {
    return $.map(arr, element => {
        element['tamponi_giornalieri_fract_nuovi_attualmente_positivi'] = element['tamponi_giornalieri'] / element['nuovi_attualmente_positivi'];
        return element;
    });
}

var tamponi_giornalieri = function(arr) {
    arr[0].tamponi_giornalieri = arr[0].tamponi;
    for (var i = 1; i < arr.length; i++) {
        arr[i].tamponi_giornalieri = arr[i].tamponi - arr[i-1].tamponi;
    }
    return arr;
}

var addCustomData = function() {
    covidData.nazionale = tamponi_giornalieri(covidData.nazionale);
    covidData.nazionale = tamponi_giornalieri_fract_nuovi_attualmente_positivi(covidData.nazionale);

    keys = Object.keys(covidData.regioni);
    
    for (var i = 0; i < keys.length; i++) {
        covidData.regioni[keys[i]] = tamponi_giornalieri_fract_nuovi_attualmente_positivi(tamponi_giornalieri(covidData.regioni[keys[i]]))
    }
    // covidData.regioni = $.map(covidData.regioni, element => {
    //     var toRet = tamponi_giornalieri(element)
    //     console.log(toRet);
    //     return tamponi_giornalieri_fract_nuovi_attualmente_positivi(toRet);
    // });
}