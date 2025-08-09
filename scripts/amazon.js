import{cart,cartSection}from '../data/cart.js';
import{products,loadProductsFetch}from '../data/products.js';
import { centToDoller } from './utils/money.js';
import { searchResult } from './searchProduct.js';


document.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');
if (searchQuery) {
  searchResult(searchQuery);
}


})

 export function search(){
  const searchBar = document.querySelector('.search-bar');
 const button= document.querySelector('.search-button');
 if(button&& searchBar){ 
 button.addEventListener('click', () => {
    const input=document.querySelector('.search-bar');
      const result=input.value.toLowerCase();

 searchResult(result);
 
 })
}

}
search();
 export function updateCartQuantity(){

let cq=0;
cart.forEach((item)=>{
cq+=item.quantity;
});

const cartQuantityElement=document.querySelector('.js-cart-quentity');
if(cartQuantityElement){
cartQuantityElement.innerHTML=cq; 
}


}
function renderHomePage(){
let  productsHtml='';
products.forEach((product)=>{
 productsHtml+=`
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
          
          </div>

          <button class="add-to-cart-button 
          button-primary js-addto-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`;

});
const gridElement = document.querySelector('.js-products-grid');
if (gridElement) {
  gridElement.innerHTML =  productsHtml;
} else {
  console.warn('product-grid not found in DOM');
}





updateCartQuantity();
document.querySelectorAll('.js-addto-cart').
forEach((product)=>{
product.addEventListener('click',()=>{

const productId=product.dataset.productId;

const container=product.closest('.product-container');
const selector=container.querySelector(`[class^="jd-quantity-selector-"]`);
const qntSelector =Number(selector.value);
console.log(qntSelector);
cartSection(productId ,qntSelector);
updateCartQuantity();
console.log(cart);

const addedIcon=container.querySelector('.added-to-cart');
 addedIcon.innerHTML=`<img src="/data/images/checkmark.png"> Added`;
       addedIcon.classList.add('added-to-cart-visible');
       setTimeout(() => {
        console.log('removing classs');
  addedIcon.classList.remove('added-to-cart-visible');
}, 1000);
      


});
});
console.log(cart);
};
async function homePage(){
  await loadProductsFetch();
  renderHomePage();
}
homePage();