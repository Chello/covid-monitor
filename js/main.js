var covidData = {
    nazionale: [],
    province: {},
    regioni: {}
}
var days;
const province = 10;
const regioni = 21;

var covidChart = {};


$(document).ready(function() {
    getAllData();
});

var getAllData = function() {
    var promises = [];

    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-andamento-nazionale.json', function(data) {
        covidData.nazionale = data;
    }));

    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-province.json', function(data) {
        data.forEach(element => {
            curProvincia = element.denominazione_provincia.trim()

            if (covidData.province[curProvincia] == undefined)
                covidData.province[curProvincia] = Array();

            covidData.province[curProvincia].push(element);
        });
        //covidData.province = data;
    }));

    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-regioni.json', function(data) {
        data.forEach(element => {

            curRegione = element.denominazione_regione.trim()

            if (covidData.regioni[curRegione] == undefined)
                covidData.regioni[curRegione] = Array();

            covidData.regioni[curRegione].push(element);
        });
    }));

    $.when.apply($, promises).then(function() {
        //create days array
        days = $.map(covidData.nazionale, function(val, i) {
            today = new Date(Date.parse(val.data));
            return (today.getDate() + '/' + (today.getMonth() +1));
        });
        createChart(createPoints(covidData.nazionale, 'nuovi_attualmente_positivi'), 'nuovi_attualmente_positivi');
        fillCampo(covidData.nazionale);
        fillRegioni();
        fillProvince();
    });

}

var createChart = function(points, field) {
    var ctx = $('#covidChart');
    covidChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{}]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

var addChartData = function(data, label) {
    var dynamicColors = function() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ", 0.2)";
    };

    var newDataset = {
        'label': label,
        'data': data,
        borderWidth: 1,
        backgroundColor: [
            dynamicColors()
        ]
    };

    covidChart.data.datasets.push(newDataset);
    covidChart.update();
}