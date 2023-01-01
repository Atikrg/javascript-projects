'use-strict';
console.log(3)

//import { addToCart } from "./shoppingCart";
/* console.log('Importing module');
//addToCart('bread', 5);
//console.log(PromiseRejectionEvent, totalQuantity);


import * as ShoppingCart from './shoppingCart.js';
//ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

import add from './shoppingCart.js';
add("pizza", 2)
add("bread", 5)
 */

/* const res = await fetch('https://jsonplaceholder.typicode.com/posts');

const data = await res.json();
console.log(data); */

/* const getLastPost = async function(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json();
    console.log(data);
    return {title:data.at(-1).title, text: data.at(-1).body};
};
 */
/* const lastPost = getLastPost();
lastPost.then(last => console.log(last)); */

/* import cloneDeep from './node_modules/lodash-es/cloneDeep.js' */
/* import cloneDeep from './lodash-es' */


//MODULE PATTERN- Encapsulate
const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    };
    
    const orderStock = function(product, quantity){
        cart.push({product, quantity});
        console.log(`${quantity} ${product} ordered from supplier`);
    };

    return{
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    }
 
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);


const state = {
    cart: [
        {product: "bread", quantity:5},
        {produce: 'pizza', quantity:5}
    ],
    user:{loggedIn: true}
}

const stateClone = Object.assign({}, state); 
  
/* const stateDeepClone = cloneDeep(state); */ //returns loggedIn :true
state.user.loggedIn = false;  //returns loggedIn:false ---> stateClone:71
console.log(stateClone);

/* console.log(stateDeepClone);  */ 
if(module.hot){ 
       
    module.hot.accept() 
}

//in nodejs

//Export
/* export.addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
}; */

//import 
/* const {addToCart} = require('./shoppingCart.js') */

class Person{
    greeting = "hey";
    constructor(name){
        this.name = name
        console.log(`${this.greeting}, ${this.name}`);
    }
}