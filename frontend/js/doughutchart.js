/*==== doughutChart =====*/
var ctx = document.getElementById( "doughutChart" );
Chart.defaults.global.defaultFontFamily = 'Arial';
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontStyle = '500';
Chart.defaults.global.defaultFontColor = '#283a5e';
var myChart = new Chart( ctx, {
    type: 'doughnut',
    data: {
        datasets: [ {
            data: [ 40, 32, 15 ],
            backgroundColor: [
                "rgba(21, 178, 236, .9)",
                "rgba(245, 164, 22, .9)",
                "rgba(0, 201, 156, .9)"
            ],
            hoverBackgroundColor: [
                "rgba(21, 178, 236, .8)",
                "rgba(245, 164, 22, .8)",
                "rgba(0, 201, 156, .8)"
            ],
            borderWidth: 3
        } ],
        labels: [
            "Bitcoin",
            "Litecoin",
            "Ripple"
        ]
    },
    options: {
        responsive: true,
        tooltips: {
            custom: function(tooltip) {
                if (!tooltip) return;
                // disable displaying the color box;
                tooltip.displayColors = false;
            },
            mode: 'index',
            titleFontColor: '#fff',
            bodyFontColor: '#fff',
            backgroundColor: '#283a5e',
            cornerRadius: 5,
            xPadding: 20,
            yPadding: 20,
            borderWidth: 3,
            borderColor:  "rgba(0, 0, 0, .9)"
        },
        legend: {
            display:false,
            labels: {
                fontSize: 13,
                fontStyle: 'bold',
                fontColor: '#fff',
                boxWidth: 50,
                padding: 13,
                bodyFontStyle: 'bold',
                usePointStyle: true
            }
        }
    }
} );