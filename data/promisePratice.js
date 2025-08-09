//first promise
// const promiseOne=new Promise((resolve,reject)=>{
//     //async work
//     setTimeout(()=>{
//         console.log('async woerk done');
//         resolve();
//     },1000);
    
// });
// promiseOne.then(()=>{
// console.log('previous task is completed');
// });

// //2nd promise
//  new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('async work 2 is done');
//          resolve();
//     },1000);
   
//  }).then(()=>{
//     console.log('this is execuated after asyn work2 is done');

//  }); 

//  //3rd promise
//  const promiseThree=new Promise((resolve,reject)=>{
// setTimeout(()=>{
// resolve({username:'ankan' ,email:'007ankan@gmail.com',age:23});
// },1000);
//  });
//  promiseThree.then((user)=>{
//     console.log(user);
//  });

// //4 th promise 
// const promiseFour=new Promise((resolve,reject)=>{
// setTimeout(()=>{
//     let error=true;
//     if(!error){
//         resolve({username:'ankan',age:23,gender:'male'})
//     }
//     else{
//         reject('ERROR:something went wrong')
//     }
// },1000)
// });

// promiseFour.then((user)=>{
//     return user.username;
// }).then((username)=>{
// console.log(username);
// }).catch((error)=>{
// console.log(error);
// }).finally(()=>{
//     console.log("the promise is resolved or reject");
// });

// //5 th promise
// const promiseFive=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//     let error=true;
//     if(!error){
//         resolve({username:'javasript',password:'1234'});
//     }
//     else{
//         reject('ERROR:Js went wrong');
//     }
// },1000 );
// });
// async function consumePromisefive(){
//     try {
//         const response= await promiseFive;
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
//  }
// consumePromisefive();

// //promise 6th
// // async function getAllUsers(){
// //     try {
// //         const response=await fetch('https://jsonplaceholder.typicode.com/posts')
// //           const data= await response.json();
// //           console.log(data);       
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }
// // getAllUsers();
// fetch('https://api.github.com/users/hiteshchoudhary')
// .then((response)=>{
// return response.json();
// }).then(data=>{
//     console.log(data);
// }).catch(error=>{
//     console.log(error);
// }); 
