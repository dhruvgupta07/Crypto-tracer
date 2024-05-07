function searchData() {
    const currentURL = window.location.href;
    const url_obj = new URL(currentURL);
    const param = new URLSearchParams(url_obj.search);
    if (!param.has('q')) {
        return;
    }
    document.getElementsByName('q')[0].value = param.get('q');
    fetch('https://api.coingecko.com/api/v3/search?query=' + param.get('q'))
        .then(convertToJSON)
        .then(render);
}

function convertToJSON(response) {
    return response.json();
}

function render(data) {
    const searchResultElement = document.getElementById('search-result');
        if (data.coins.length === 0) {
        const noResultMessage = document.createElement('div');
        noResultMessage.classList.add('noFound');

        noResultMessage.innerText = "No results found :(";
        searchResultElement.appendChild(noResultMessage);
        return;
    }
   
    for (let i = 0; i < data.coins.length; i++) {
       
        const singleCoin = data.coins[i];
        console.log(singleCoin);
        const index = i + 1;
        const logo = singleCoin.thumb;
        const Cname = singleCoin.name;
        const symbol = singleCoin.symbol;
        const coinId = singleCoin.id;
        createSingle(index, logo, Cname, symbol, coinId);
    }
}

function createSingle(index, logo, Cname, symbol, coinId) {
    const id_ele = document.createElement('p');
    if(index<10){
        index+="&nbsp;&nbsp";
    }
    id_ele.innerHTML = index;

    const logo_e = document.createElement('img');
    logo_e.src = logo;
    logo_e.alt = "Coin-Logo";

    const name_e = document.createElement('h3');
    name_e.innerText = Cname;

    const symbol_e = document.createElement('h3');
    symbol_e.innerText = symbol;

    const anchor_e = document.createElement('a');
    anchor_e.innerText = "More Info";
    anchor_e.href = "../html/detail.html?id=" + coinId;

    const check_e = document.createElement('input');
    check_e.type="checkbox";


    const cont_ele = document.createElement('div');
    cont_ele.classList.add('SingleResult');
    cont_ele.appendChild(id_ele);
    cont_ele.appendChild(logo_e);
    cont_ele.appendChild(name_e);
    cont_ele.appendChild(symbol_e);
    cont_ele.appendChild(anchor_e);
    cont_ele.appendChild(check_e);


    document.getElementById('search-result').appendChild(cont_ele);
}

window.onload = function() {
    searchData();
};

