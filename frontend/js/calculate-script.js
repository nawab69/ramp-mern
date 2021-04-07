
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const usdInput = document.getElementById('amtUSD');
const btcInput = document.getElementById('amtBTC');
let amtBTC = btcInput.value;
const CoinInput = document.getElementById("selected-coin");
const CurrencyInput = document.getElementById("selected-currency");
let coinName = CoinInput.options[CoinInput.selectedIndex].value;
let currencyName = CurrencyInput.options[CurrencyInput.selectedIndex].value;
let cryptoRate = {
    bitcoin: 0,
    ethereum: 0,
    ripple: 0,
    monero: 0,
    litecoin: 0,
    "bitcoin-cash": 0,
};
let fiat_currency_rates = {};

function bitconFetchCoinRate(callback) {
    // build rate array on page load 
    fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,ripple,bitcoin-cash,litecoin,monero", requestOptions)
        .then(response => response.text())
        .then(result => {
            const r = JSON.parse(result);
            // build rate array
            if (r.data) {

                r.data.forEach(crypto => {
                    cryptoRate[crypto.id] = parseFloat(crypto.priceUsd);
                });

                bitcoinFetchCurrencyRate(callback);
                
            }
        })
        .catch(error => console.log('error', error));
}

// fetch rate and set inital exchange rate
bitconFetchCoinRate(bitconCalcualteCoinRate);

// change exchange rate on crypotocurrency amount change
$('#amtBTC').bind('change paste keyup', function() {
    coinName = CoinInput.options[CoinInput.selectedIndex].value;
    currencyName = CurrencyInput.options[CurrencyInput.selectedIndex].value;

    const coinAmount = $(this).val();
    bitconCalcualteCoinRate(coinName, coinAmount, currencyName);
});


// change exchange rate on crypotocurrency name change
function bitconCalcualteCoinRate(coinName, coinAmount, currencyName) {

    const totalUSD = coinAmount * cryptoRate[coinName];
    let totalValue = totalUSD;

    if ('USD' !== currencyName) {
        let currencyValue = fiat_currency_rates[currencyName];

        totalValue = totalUSD * currencyValue;
    }


    usdInput.value = totalValue.toFixed(2);
}


function bitcoinFetchCurrencyRate(callback) {
    fetch("https://api.coincap.io/v2/rates", requestOptions)
        .then(response => response.text())
        .then(result => {
            let r = JSON.parse(result);

            let selectOptions = '';
            r.data.forEach((value, index) => {
                //console.log(value);
                if ("fiat" === value.type) {
                    let rate1usd = parseFloat(value.rateUsd);
                    if (rate1usd <= 1) {
                        rate1usd = 1 / rate1usd;
                        fiat_currency_rates[value.symbol] = rate1usd;
                    } else {
                        fiat_currency_rates[value.symbol] = rate1usd;
                    }

                    //selectOptions += `<option value="${value.symbol}">${value.symbol} - ` + titleCase(value.id.replace("-", " ")) + '</option>';
                }
            });
            //console.log(selectOptions);
            //CurrencyInput.innerHTML = selectOptions;
            callback(coinName, amtBTC, currencyName); // set the btc rate on first page load
            return fiat_currency_rates;

        })
        .catch(error => console.log('error', error));
}

function bitconCalculateOnCryptoChange(coinName){
    amtBTC= btcInput.value;
    currencyName = CurrencyInput.options[CurrencyInput.selectedIndex].value;
    bitconCalcualteCoinRate(coinName, amtBTC, currencyName);
}

function bitconCalculateOnCurrencyChange(currencyName) {
    amtBTC = btcInput.value;
    coinName = CoinInput.options[CoinInput.selectedIndex].value;
    bitconCalcualteCoinRate(coinName, amtBTC, currencyName);
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}