const num = [1,2,3,4,5,6,7,8,9,10];

/**
        * acc ==> accumulator
        * ele ==> element
        * i ==> index
        * arr ==> array
        */
let sum = num.reduce((acc, cur, i, arr )=> {
       console.log(`acc = ${acc}`)
       console.log(`cur = ${cur}`)
       console.log(`i = ${i}`)
       console.log(`arr = ${arr}`)

       acc + cur, 0
       }
       );

console.log(`sum ${sum}`)




const calcAverageHumanAge = ages =>
       ages.map(age=>(age <=2 ? 2 * age : 16 + age * 4))
       .filter(age => age >= 18)

       /**
        * acc ==> accumulator
        * ele ==> element
        * i ==> index
        * arr ==> array
        */
       .reduce((acc, ele, i, arr) => acc + ele / arr.length, 0); 
      
const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(data1, data2) 