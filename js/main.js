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
        createChart(createPoints(covidData.nazionale, 'tamponi'), 'tamponi');
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
            datasets: [{
                label: field,
                data: points,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1
            }]
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
    covidChart.data.datasets.label = label;
    covidChart.data.datasets.data = data;
    covidChart.update();
}

var createPoints = function(topic, field) {
    return $.map(topic, function(val) {
        return val[this.field];
    }.bind({field: field}));
}