
 //MVC-model view controler 
 import {cart, removeFromCart,saveToStorage,updateDeliveryOptions} from '../../data/cart.js';
 import {products} from '../../data/products.js';
import{centToDoller} from '../utils/money.js';
import{renderActualCheckoutPage} from '../checkout.js';
//through esm we import a library from web
//import{hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions ,getDeliveryOption} from '../../data/delivary-options.js';
import { renderPaymentSummary } from './paymetSummeary.js';

 export function renderCheckout(){
 let cartItemHtml='';
cart.forEach((cartItem)=>{

  /*Your cart only stores ID and quantity — no product name, price, etc.
  But when showing the cart on screen, you need the product image, name, price — not just the ID!
  So you find the full product based on ID before building the HTML*/
    const productId=cartItem.productId;
    let matchingItem;
    products.forEach((product)=>{
    if(product.id===productId)
matchingItem=product;
    })
/* 
    ->The cartItem just knows what product it is (via ID).
    ->You use the ID to look up the full product details
  (name, image, price) from the products list.
*/ 
const deliveryOptionId=cartItem.deliveryOptionId;
const deliveryOption=getDeliveryOption(deliveryOptionId);
const today=dayjs();
  const deliveryDate=today.add(
  deliveryOption.deliveryDays,'days');
  const dateString=deliveryDate.format('dddd, MMMM D');

  cartItemHtml+=`
    <div class="cart-item-container
    js-cart-item-container-${matchingItem.id}
    ">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
        $ ${matchingItem.name}
        </div>
        <div class="product-price">
        $${centToDoller(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span >
            Quantity:<span class="insideQnt-${matchingItem.id}"> ${cartItem.quantity}
            </span></span>
          <span class="update-quantity-link link-primary js-update-link"
          data-product-id="${matchingItem.id}">
            Update
          </span>
          <input type="text" class="quantity-input css-qnt-input js-qnt-input-${matchingItem.id}">
          <span class="save-quantity-link link-primary css-save-link js-save-link-${matchingItem.id}">Save</span>
          <span class="delete-quantity-link  link-primary
          js-delete-link"data-product-id="${matchingItem.id}" >
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        
        ${ DeliveryOptions(matchingItem,cartItem)}
       
      </div>
    </div>
  </div>
`;

 });



 function DeliveryOptions(matchingItem ,cartItem){
  let deliveryOptionsHtml='';
 deliveryOptions.forEach(dates=>{
  const today=dayjs();
  const deliveryDate=today.add(
  dates.deliveryDays,'days');
  const dateString=deliveryDate.format('dddd, MMMM D');
  const priceString= dates.priceCents
  === 0
  ? `FREE`
  : `$${centToDoller(dates.priceCents)} `;
const isChecked=dates.id===cartItem.deliveryOptionId;
deliveryOptionsHtml+=` <div class="delivery-option js-delivery-option"
data-product-id="${matchingItem.id}"
data-delivery-option-id="${dates.id}">                                         
          <input type="radio"                      
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
           
            ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} - Shipping
            </div>
          </div>
        </div>`

 });

 return deliveryOptionsHtml;
 };






 document.querySelector('.js-order-summary').innerHTML=cartItemHtml;
 let headerCheckout=document.querySelector('.return-to-home-link');

 function updateCheckOutQuantity(){

  let cq=0;
  cart.forEach((item)=>{
  cq+=item.quantity;
  });
  headerCheckout.innerHTML=`${cq} items`
  //return cq;
  }

function saveQuantityButton(productId,link){

      let updateInput = document.querySelector(`.js-qnt-input-${productId}`);
      let saveLink = document.querySelector(`.js-save-link-${productId}`);
      let insideQnt=document.querySelector(`.insideQnt-${productId}`);
      link.style.display = 'none';
      updateInput.style.display = 'inline-block';
      saveLink.style.display = 'inline-block';
      insideQnt.style.display='none';

  saveLink.addEventListener('click',()=>{ 
      let updateQnt=Number(updateInput.value);
         console.log(updateQnt);
            cart.forEach(item=>{
               if(item.productId===productId){
                    item.quantity=updateQnt;
                       insideQnt.innerHTML=updateQnt;
                      }
                      });
                   updateCheckOutQuantity();
                   saveToStorage();
                   link.style.display = 'inline-block';
                   updateInput.style.display = 'none';
                   saveLink.style.display = 'none'; 
                   insideQnt.style.display='inline-block';
renderPaymentSummary();
                  });
    
}

//delete button
 document.querySelectorAll('.js-delete-link').
  forEach((link)=>{
    link.addEventListener('click',()=>{
       const productId=link.dataset.productId;
           removeFromCart(productId); 
           updateCheckOutQuantity();
           renderActualCheckoutPage();
                  console.log(cart);
                    let container=document.querySelector(
                         `.js-cart-item-container-${productId}`
                              );
                    container.remove();
                    
                    //when there is one item in cart end we remove the item from cart
                    renderPaymentSummary();
                  
                   });
  }); 

  updateCheckOutQuantity();
  
  //update button
document.querySelectorAll('.js-update-link').
  forEach((link)=>{  

 link.addEventListener('click',()=>{
     let productId=link.dataset.productId;
        saveQuantityButton(productId,link);
});
});
console.log(cart );
document.querySelectorAll('.js-delivery-option').
forEach((selector)=>{
  selector.addEventListener('click',()=>{
   
    const productId=selector.dataset.productId;
    const deliveryOptionId=selector.dataset.deliveryOptionId;
    console.log(productId,deliveryOptionId);
//const {productId,deliveryOptionId}=selector.dataset;
updateDeliveryOptions(productId,deliveryOptionId); 
renderCheckout();
renderPaymentSummary();
  });
});
}
