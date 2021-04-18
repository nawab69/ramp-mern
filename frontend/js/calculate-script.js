"use strict";

const price = document.getElementById("price-1");

const convertMoney = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
};

const executePrice = (data) => {
  for (const [key, value] of Object.entries(data)) {
    const price = document.getElementById(`price-${key}`);
    const market = document.getElementById(`market-${key}`);
    const supply = document.getElementById(`supply-${key}`);
    const volume = document.getElementById(`volume-${key}`);
    const change = document.getElementById(`change-${key}`);

    price.innerText = `$${parseFloat(value.quote.USD.price).toFixed(2)}`;
    market.innerText = `$${convertMoney(value.quote.USD.market_cap)}`;
    supply.innerText = `$${convertMoney(value.total_supply)}`;
    volume.innerText = `$${convertMoney(value.quote.USD.volume_24h)}`;
    change.innerText = `${parseFloat(
      value.quote.USD.percent_change_24h
    ).toFixed(2)}`;

    if (value.quote.USD.percent_change_24h < 0) {
      change.classList.add("red");
    } else {
      change.classList.add("green");
    }
  }
};

fetch("api/prices")
  .then((response) => response.json())
  .then((data) => {
    executePrice(data);
  });
