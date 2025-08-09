//import { renderActualCheckoutPage }   from  "../scripts/checkout.js";

export let cart= JSON.parse(localStorage.getItem('cart'))||[];

// export function clearCart(){
//   cart = [];
//   localStorage.setItem('cart', JSON.stringify(cart));

// };


if(!cart){
cart=[
  
{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:1,
  deliveryOptionId:'1'
},

{
productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
quantity:1,
 deliveryOptionId:'2'
}

];
}

export  function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export  function cartSection(productId,qntSelector){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.productId)
    matchingItem=item; 
    });
    if(matchingItem){
      matchingItem.quantity+=qntSelector;
      
    }else{
      cart.push(
        {
          productId:productId,
          quantity:qntSelector,
           deliveryOptionId:'1'
        }
        
      );
    }
    saveToStorage();
 }
 export function removeFromCart(productId){
 const newCart=[];
 cart.forEach((cartItem)=>{
if(cartItem.productId !==productId){ //productId is the deleted items ID
  newCart.push(cartItem);//so except that product we will add all other products in the new cart arrray    
}                       //and finally we copy the new car into old cart array
 });
 cart=newCart;
 saveToStorage();
 // renderActualCheckoutPage();
  
 }

 export function updateDeliveryOptions(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((item)=>{
    if(item.productId===productId) matchingItem=item;
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveToStorage();
 }

 export function loadCart(funn){ 
    const xhr=new XMLHttpRequest;
   xhr.addEventListener('load',()=>{
 console.log( xhr.response);
 funn();
   });
  
   xhr.open('GET','https://supersimplebackend.dev/cart');
   xhr.send();
 };
 console.log('jay sri ram');
 console.log(cart);
