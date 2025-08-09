import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import{ getDeliveryOption} from '../../data/delivary-options.js';
import {centToDoller} from '../utils/money.js';
import { addOrder } from '../../data/order.js';
//import{renderOrdersPage}from'../../data/order.js'






export function renderPaymentSummary(){
    let totalPrice=0 ;
    let shippingPrice=0;
    let itemQunt=0;
 cart.forEach((items)=>{
    let ProductId =items.productId
    let matchingItem='';
    products.forEach(product=>{
           if(product.id===ProductId){
                matchingItem=product ;
                  } 
    });
itemQunt+=items.quantity;

    totalPrice += (items.quantity * matchingItem.priceCents);

 const deliveryOption=getDeliveryOption(items.deliveryOptionId);

  shippingPrice +=deliveryOption.priceCents;
 });
 console.log(itemQunt);
 const totalBeforeTax=totalPrice+shippingPrice;
 const estimetedTax=totalBeforeTax*0.1
 const orderTotal= totalBeforeTax+estimetedTax;
 const paymentSummaryHtml=`
  
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemQunt}):</div>
            <div class="payment-summary-money">$${ centToDoller(totalPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centToDoller(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centToDoller(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centToDoller(estimetedTax)}</div>
          </div>
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centToDoller(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary
           js-place-order">
            Place your order
          </button>

 `;
 document.querySelector('.js-payment-summary').
 innerHTML=paymentSummaryHtml;
console.log('ankan ghosh abhdkd');
console.log(cart);
document.querySelector('.js-place-order').
addEventListener('click',async ()=>{
  try{
 const response=await fetch('https://supersimplebackend.dev/orders',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      cart:cart
    })
 
  });
  const order = await response.json();
//   localStorage.removeItem('cart');
// cart = []; // if you also use a cart array in memory

  //console.log(order);
if (order.errorMessage) {
  console.error('Backend error:', order.errorMessage);
  return; // do NOT add to orders
}else {addOrder(order);
  cart.length = 0; // Clear cart array
localStorage.removeItem('cart');

}
  }
  catch(error){
console.log('error: something went Wrong');
  }
  //this line of code redirect to orders page
 window.location.href="orders.html";

  
})

}