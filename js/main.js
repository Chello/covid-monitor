var covidData = {
    nazionale: 0,
    province: 0,
    regioni: 0
}
var days;


$(document).ready(function() {
    getAllData();
});

var getAllData = function() {
    var promises = [];
    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-andamento-nazionale.json', function(data) {
        covidData.nazionale = data;
    }));

    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-province.json', function(data) {
        covidData.province = data;
    }));

    promises.push($.getJSON('COVID-19/dati-json/dpc-covid19-ita-regioni.json', function(data) {
        covidData.regioni = data;
    }));

    $.when.apply($, promises).then(function() {
        //create days array
        days = $.map(covidData.nazionale, function(val, i) {
            today = new Date(Date.parse(val.data));
            return (today.getDate() + '/' + (today.getMonth() +1));
        });
        createChart(createPoints(covidData.nazionale, 'deceduti'), 'deceduti');
    });

}

var createChart = function(points, field) {
    var ctx = $('#covidChart');
    var covidChart = new Chart(ctx, {
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

var createPoints = function(topic, field) {
    return $.map(topic, function(val) {
        return val[this.field];
    }.bind({field: field}));
}