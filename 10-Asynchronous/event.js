console.log("Test Start");

//callback
setTimeout(()=> console.log("0 sec timer"), 0);

//microstack queue
Promise.resolve("Resolved promise 1").then(res => 
    console.log(res));

Promise.resolve("Resolved promise 2").then(res=>{
    for(let i = 0; i < 1000; i++){

    }
    console.log(res);
   
})

    console.log("Test end");