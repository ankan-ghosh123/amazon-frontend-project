console.log('request');
const xhr = new XMLHttpRequest();//allows to make a http request to backend
xhr.addEventListener('load',()=>{
console.log(xhr.response);
});
//setup req
//xhr.open('type of req','url of backend we want to send the messege')
//xhr.open('GET','https://supersimplebackend.dev');
//xhr.open('GET','https://supersimplebackend.dev/hello');
xhr.open('GET','https://supersimplebackend.dev/products/first');
xhr.send();// this is a asynchronous code ,
//sending request may take some time 

console.log('sending request ....');