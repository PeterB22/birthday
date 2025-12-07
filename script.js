
const priceElement = document.getElementsByClassName('price');
fetch('config.json').then(response => response.json()).then(config => {
    priceElement[0].textContent = `${config.price}`;
});