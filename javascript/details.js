function loadDetail() {
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params = new URLSearchParams(url_obj.search);

    if(!params.has('id')) {
        window.location.href = "/";
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(convertToJSON)
        .then(render);
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}/market_chart?vs_currency=inr&days=3&interval=daily`)
        .then(convertToJSON)
        .then(renderChart);
}

function convertToJSON(response) {
    return response.json();
}

function render(data) {
    console.log(data);
    const name = `${data.name} (${data.symbol})`;
    const description = data.description.en;
    const logo = data.image.large;

    const inr = data.market_data.current_price.inr;
    const usd = data.market_data.current_price.usd;
    const eur = data.market_data.current_price.eur;
    const gbp = data.market_data.current_price.gbp;

    document.getElementById('coin-name').innerText = name;
    document.getElementById('coin-description').innerHTML = description;
    document.getElementById('coin-logo').src = logo;
    document.getElementById('inr-price').innerText = inr;
    document.getElementById('usd-price').innerText = usd;
    document.getElementById('eur-price').innerText = eur;
    document.getElementById('gbp-price').innerHTML = gbp;
}

window.onload = function() {
    loadDetail();
}

function renderChart(data) {
    const prices = data.prices;
    const timesstamps = [];
    const prices_inr = [];
    
    // Extract timestamps and prices_inr from prices array
    for (let i = 0; i < prices.length; i++) {
        const single_price = prices[i];
        const date_obj=new Date(single_price[0]);
        let hours=date_obj.getHours();
        if(hours < 10){
            hours = "0" + hours;
        }
        let minutes=date_obj.getMinutes();
        if(minutes<10){
            minutes="0"+minutes;
        }
        timesstamps.push(`${hours}:${minutes}`);
        prices_inr.push(single_price[1]);
    }

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timesstamps,  // Use timestamps array for labels
            datasets: [{
                label: 'Price in INR',  // Update label to reflect the data
                data: prices_inr,       // Use prices_inr array for the data
                borderColor: 'rgba(75, 192, 192, 1)', // Example color (adjust as needed)
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Example background color
                borderWidth: 1
            }]
        },
        options: {
            plugins:{
                legend:{
                    display:false,
                }
            }
        }
    });
}
