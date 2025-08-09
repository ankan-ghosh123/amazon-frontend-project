import { cart, cartSection } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { centToDoller } from './utils/money.js';
import { updateCartQuantity } from './amazon.js';

export function searchResult( result){//fyn start

let searchResultHtml=''; //search result html
loadProductsFetch().then(() => { //then start

products.forEach((product) => { //loop start

if(product.name.toLowerCase().includes(result)){ //1st start

searchResultHtml+=`
 
 <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${centToDoller(product.priceCents)}
          </div>

          <div class="product-quantity-container" js-qnt-selector>
            <select class="jd-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary js-addto-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>

`;

const resultContainer=document.querySelector('.js-products-grid');
console.log(resultContainer);
if(resultContainer){
resultContainer.innerHTML=searchResultHtml;}
else{
  console.warn('product-grid not found in DOM');
}

document.querySelectorAll('.add-to-cart-button').
forEach(itretor=>{
  itretor.addEventListener('click', () => {
  const productId = itretor.dataset.productId;
const selector= document.querySelector(`.jd-quantity-selector-${productId}`);
const qntSelector = Number(selector.value);

cartSection(productId, qntSelector);
updateCartQuantity();

});
});
} //1st end
// else {
//   document.querySelector('.js-products-grid').innerHTML=`No product  found for your search -${result}`;
  
// }
})//loop end
if (searchResultHtml === '') {

  const notFound=document.querySelector('.js-products-grid');
  console.log(notFound);
 notFound.innerHTML = `
    <div class="not-found">
    <img 
      src="data/images/puppy.png" 
      alt="No product found" 
    >
    <pre> 
      product not found for your search
    </pre>
  </div>
`;
 
};
})
 
}
 






// let searchResultHtml=''; //search result html
// loadProductsFetch().then(() => { //then start

// products.forEach((product) => { //loop start

// if(product.name.toLowerCase().includes(result)){ //1st start

// searchResultHtml+=`
 
//  <div class="product-container">
//           <div class="product-image-container">
//             <img class="product-image"
//               src="${product.image}">
//           </div>

//           <div class="product-name limit-text-to-2-lines">
//             ${product.name}
//           </div>

//           <div class="product-rating-container">
//             <img class="product-rating-stars"
//               src="images/ratings/rating-${product.rating.stars*10}.png">
//             <div class="product-rating-count link-primary">
//               ${product.rating.count}
//             </div>
//           </div>

//           <div class="product-price">
//             $${centToDoller(product.priceCents)}
//           </div>

//           <div class="product-quantity-container" js-qnt-selector>
//             <select class="jd-quantity-selector-${product.id}">
//               <option selected value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </div>

//           <div class="product-spacer"></div>

//           <div class="added-to-cart">
//             <img src="images/icons/checkmark.png">
//             Added
//           </div>

//           <button class="add-to-cart-button 
//           button-primary js-addto-cart"
//           data-product-id="${product.id}">
//             Add to Cart
//           </button>
//         </div>

// `;

// const resultContainer=document.querySelector('.js-products-grid');
// if(resultContainer){
// resultContainer.innerHTML=searchResultHtml;}
// else{
//   console.warn('product-grid not found in DOM');
// }

// document.querySelectorAll('.add-to-cart-button').
// forEach(itretor=>{
//   itretor.addEventListener('click', () => {
//   const productId = itretor.dataset.productId;
// const selector= document.querySelector(`.jd-quantity-selector-${productId}`);
// const qntSelector = Number(selector.value);

// cartSection(productId, qntSelector);
// updateCartQuantity();

// });
// });
// } //1st end
// // else {
// //   document.querySelector('.js-products-grid').innerHTML=`No product  found for your search -${result}`;
  
// // }
// })//loop end
// if (searchResultHtml === '') {

//   const notFound=document.querySelector('.js-products-grid');
//  notFound.innerHTML = `
//     <div class="not-found">
//     <img 
//       src="data/images/puppy.png" 
//       alt="No product found" 
//     >
//     <pre> 
//       product not found for your search
//     </pre>
//   </div>
// `;
 
// };
// })//then end

//fun end
// export function search(){
//   const searchBar = document.querySelector('.search-bar');
//  const button= document.querySelector('.search-button');
//  if(button&& searchBar){ 
//  button.addEventListener('click', () => {
//     const input=document.querySelector('.search-bar');
//       const result=input.value.toLowerCase();

//  searchResult(result);
 
//  })
// }

// }