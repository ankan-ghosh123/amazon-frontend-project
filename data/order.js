 import { products,loadProductsFetch } from "./products.js";
 import {centToDoller} from "../scripts/utils/money.js";
import {cart,saveToStorage} from"./cart.js";
//import{ankan} from '../scripts/amazon.js';
import{loadPage} from '../scripts/checkout.js';
 import { updateCartQuantity } from "../scripts/amazon.js";
 import {  searchResult } from '../scripts/searchProduct.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



const searchBar = document.querySelector('.search-bar');
 const button= document.querySelector('.search-button');
 if(button&& searchBar){ 
 button.addEventListener('click', () => {

    const input=document.querySelector('.search-bar');
      const result=input.value.toLowerCase();
const amazonSearchUrl=`amazon.html?search=${encodeURIComponent(result)}`;
window.location.href=amazonSearchUrl;
 
  // window.location.href = 'amazon.html'; 
 
 })
};




 export const orders=JSON.parse(localStorage.getItem('orders'))||[];
// ankan();
console.log(cart);

 export function addOrder(order){
    orders.unshift(order);
console.log(orders);
    saveToStorge();
    
 }

 function saveToStorge(){
    localStorage.setItem('orders',JSON.stringify(orders));

 }




  //function search(){
  

export  function renderOrdersPage(){
 

//updateCartQuantity();//clear the order grid before rendering new orders



 let orderHtml=``;
    loadProductsFetch()
  .then(()=>{
     orders.forEach((order)=>{
   
   order.products.forEach(product=>{
let matchingItem='';
products.forEach(item=>{
if(item.id===product.productId) matchingItem=item;
})
//removeFromCart(matchingItem.id);
 orderHtml+=` 
<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('dddd, MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${centToDoller(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
              ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary" data-product-id="${matchingItem.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

       
          </div>
        
     `;
      });
      });
      const orderContainer = document.querySelector('.order-grid');
if (orderContainer) {
  orderContainer.innerHTML = orderHtml;
} else {
  console.warn('order-container not found in DOM');
}

document.querySelectorAll('.buy-again-button').
forEach(button => {
  button.addEventListener('click' , (event) => {
    const productId=button.dataset.productId;
    cart.push(
        {
          productId:productId,
          quantity:1,
           deliveryOptionId:'1'
        })
    saveToStorage();
    updateCartQuantity();
loadPage();
  });



console.log(cart)
 
})


  
});
//if(document.querySelector('.js-products-grid')){
 
//}
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
  renderOrdersPage();
   
});
