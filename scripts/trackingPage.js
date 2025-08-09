import { orders } from '../data/order.js';
import { loadProductsFetch,products } from '../data/products.js';
import { updateCartQuantity } from './amazon.js'
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

function renderTrackingPage(){
const params = new URLSearchParams(window.location.search);
const orderId = params.get('orderId');

const productId = params.get('productId');
console.log('productId from url:'+productId);
console.log('orderId from url:'+orderId);

orders.forEach((order,index) => {
  console.log(index)
  console.log(order)
})
let imageurl='';
let name='';
let quantity=0;
let matchingItem='';
let deliveryDate='';
let orderDate='';

loadProductsFetch().
then(() => {
 orders.forEach(order=>{ //order loop open
if(order.id===orderId.trim()){//1st
orderDate=new Date(order.orderTime);
order.products.forEach(product => { //product loop open

if(product.productId===productId){ //2nd

deliveryDate=new Date(product.estimatedDeliveryTime);
quantity=product.quantity;


}//2nd close

})//product loop close

}//1st close

 }) //orderloop close

 products.forEach(item=>{ //products from data, loop

if(item.id===productId){ //3rd 
 
  imageurl=item.image;
  name=item.name;
} //3 rd close

 })//products from data ,loop close

 //all data collected to render the html on the page dynamically
console.log('date of delivery:'+deliveryDate)
console.log('quantity:'+quantity);
  console.log('imageurl:'+imageurl);
  console.log('name:'+name);
  console.log('orderDate:'+orderDate);
  //all data collected to render the html on the page dynamically
updateCartQuantity();
  let trackingPageHtml='';
  trackingPageHtml+=`
  <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on: ${dayjs(deliveryDate).format('dddd, MMMM D') }
        </div>

        <div class="product-info">
     ${name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${imageurl}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" id="progress-bar"></div>
        </div>
      </div>
  `;
  
  const mainElement = document.querySelector('.js-main');
  mainElement.innerHTML = trackingPageHtml;
const today=new Date();

const totalTime= deliveryDate - orderDate;
const elapsed = today - orderDate;

// Calculate percentage (clamp between 0 and 100)
let progress = Math.min(Math.max((elapsed / totalTime) * 100, 0), 100);

// Round to whole number
progress = Math.round(progress);
console.log('progress is:'+progress)
// Set progress bar

document.querySelector('.progress-bar').style.width = progress + '%';
});
}
renderTrackingPage();

