

/* 1-Récupérer les différentes parties des chaînes json et retourner un tableau */
const orderInformation = window.location.search.substr(1).split('&');
const orderId = orderInformation[0].replace('id=', '');
const totalPrice = orderInformation[1].replace('price=', '');
const userName = orderInformation[2].replace('user=', '');

document.querySelector('.user').textContent += userName;
document.querySelector('.order-id').textContent += orderId; 
document.querySelector('.total-price').textContent += totalPrice; 