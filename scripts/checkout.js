import { renderCheckout} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymetSummeary.js';
//import '../data/backend-pratice.js';
//import '../data/promisePratice.js';
import {/* loadProducts ,*/ loadProductsFetch} from '../data/products.js';
import {loadCart,cart} from '../data/cart.js';
import{updateCartQuantity} from './amazon.js';

//type 1
/*
new Promise((resolve)=>{
    loadProducts(()=>{
resolve();
});
}).then(()=>{
  return new Promise((resolve)=>{
loadCart(()=>{
    resolve();
});
  });
}).then(()=>{
    renderCheckout();
renderPaymentSummary();
});

*/




//type 3
/*
Promise.all([
// new Promise((resolve)=>{
//     loadProducts(()=>{
// resolve('value 1');
// });
// }),

loadProductsFetch(),
new Promise((resolve)=>{
loadCart(()=>{
    resolve('value2');
});
  })

]).then((values)=>{
    console.log(values);
    
     renderCheckout();
renderPaymentSummary();
})
*/


//async awit 
 export async function loadPage(){
  try{
 await loadProductsFetch();
 //loadCard use callback does not return a 
 //promise directly like loadProductsFetch
 //thats why we cant do "awit loadCard()" directly
 //we wrap the loadCard() in a promise the use await 
 await new Promise((resolve)=>{
loadCart(()=>{
    resolve('value2');
});
  });
}catch(error){
console.log('ERROR:something went wrong'); 
}
  renderCheckout();
renderPaymentSummary();

}


  console.log('rendering checkout page');
  const gridElement = document.querySelector('.js-products-grid');
  if (gridElement) {
    gridElement.innerHTML = '';
  } else {
    console.warn('product-grid not found in DOM');
  }
  
  // renderCheckout();
  // renderPaymentSummary();
  
  
export function renderActualCheckoutPage(){
 if(cart.length===0){
  //console.log('s');

  //console.log('e');
  const cartContainer = document.querySelector('.js-order-summary');
  if(cartContainer){
  cartContainer.innerHTML = `
    <div class="js-cart-summary cart-summary">
     <div class="empty-cart-message" >
        <h4>Your Cart is Empty</h4></div>
        <div>
        <button class="view-button" >View Products</button>
      </div>
    </div> 
  `;
   document.querySelector('.view-button').addEventListener('click', () => {
      window.location.href = 'amazon.html';
    });
  renderPaymentSummary(); // Render empty payment summary
 // Redirect to home page
  }
}
else{
  loadPage();

}
}

renderActualCheckoutPage();
  