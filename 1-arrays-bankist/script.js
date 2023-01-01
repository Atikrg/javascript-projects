'use strict';
console.log("---Hello Arrays-Bankist---")

// Data
const account1 = {
    owner: 'Atik Rangnekar',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-07-28T23:36:17.929Z",
      "2020-08-01T10:51:36.790Z",
    ],
    currency: 'INR',
    locale: 'en-NZ'//NewZealand
      
  };
  
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: 'CAD',
    locale: 'he'//hebrew
  };
  
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
const accounts = [account1, account2, account3, account4];
  
  // Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function(date, locale){
  const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  
    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

  if(daysPassed === 0) return "Today";
  if(daysPassed === 1) return "Yesterday";
  if(daysPassed <= 0) return `${daysPassed} days ago`;
  else{
    /* const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; */
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
const formatCur = function(value, locale, currency){
  return new Intl.NumberFormat(locale,
    {
      style: 'currency',
      currency: currency
    }).format(value);
}
const displayMovements = function(acc, sort = false){
  containerMovements.innerHTML = '';
  
  const movsElements = sort ? acc.movements.slice().sort((a, b)=> a - b) : acc.movements;
  //.sort((a, b) => a - b) : acc.movements;

  movsElements.forEach(function(mov, i){
/**ovements: [200, 450, -400, 3000, -650, -130, 70, 1300], */
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    /* const formattedMov = new Intl.NumberFormat(acc.locale,
      {
        style: 'currency',
        currency: acc.currency
      }).format(mov); */
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        
    `
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  
};

//displayMovements(account1.movements)
//calcDisplaySummary
const calcDisplaySummary = function(acc){
    //incomes

    const incomes = acc.movements
                  .filter(mov => mov > 0)
                  .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(acc.balance, acc.locale, acc.currency);
  //out
    const out = acc.movements
              .filter(mov => mov < 0)
              .reduce((acc, mov)=> acc + mov, 0)
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
    //interest
    const interest = acc.movements
                     .filter(mov => mov > 0)
                     .map(deposit => deposit * acc.interestRate / 100)
                     .filter((int, i, arr) => int >= 1) 
                     .reduce((acc, int) => acc + int, 0);   
      labelSumInterest.textContent = formatCur(acc.interest, acc.locale, acc.currency);
   
  };    
//calcDisplaySummary(account1.movements)

//calcDisplayBalance
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.
                  reduce(
                    (acc, mov) => acc + mov,0
                  );

  labelBalance.textContent = `${acc.balance} ${acc.currency}`;
};
//calcDisplayBalance(account1.movements);


//CreateUsernames
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
  })
}
createUsernames(accounts)

const updateUI = function(acc){
   //Display movements
   displayMovements(acc)
   //Display balance
   calcDisplayBalance(acc);

   //Display summary
   calcDisplaySummary(acc);
 
};

const startLogOutTimer = function(){
  const tick = function(){
    const min = String(Math.trunc(time / 60)).padStart(2, 0); //times
    const sec = String(time % 60).padStart(2, 0); //seconds
    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;
    //Decrease 1 second
  
    //When 0 seconds, stop timer stop timer and logout user
    if (time === 0){
      clearInterval(timer);
      labelWelcome.textContent = "Login in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // Set Time 
  let time = 120;
  //Call the timer every second 
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
 };

 let currentAccount, timer;
//console.log(accounts)
//curriences
/* const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]); */
  
/* const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; */

//[filter]
//const deposits = movements.filter((mov)=>(mov >0));
//console.log(deposits);
/* const withdrawal = movements.filter(mov => mov < 0) */;
//console.log(withdrawal)
  //[reduce]
//const movements = [3,4,1,-1,-9]
/* const balance = movements
                .reduce((acc, cur, i, arr)=>
                acc + cur,0); 
 */


  /////////////////////////////////////////////////
/* const movementsDescriptions = movements.map((mov, i) =>{
`Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
}); */
//console.log(movementsDescriptions);

//maximum value of movements array
/* const max = movements.reduce((acc, mov)=> {
  if(acc > mov) return acc;
  else return mov;
}, movements[0]); */

//console.log(max);

/* const calcAverageHumanAge = function(ages){
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  //console.log(humanAges);
 // console.log(adults);

  const average = adults
                .reduce(
                (acc, age, i, arr) => acc + age / arr.length , 0);
  return average;
};


const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
//console.log(avg1, avg2)
 */
/* const euroToUsd = 1.1; */
//PIPILINE 
/* const totalDepositsUSD = movements
        .filter(mov => mov > 0)
        .map(mov => mov * euroToUsd)
        .reduce((acc, mov) => acc + mov, 0) */
//console.log(totalDepositsUSD)

//coding challenge 3
/* const calcAverageHumanAge = ages =>
       ages
       .map(age=> (age <=2 ? 2 * age : 16 + age * 4))
       .filter(age => age >= 18)
       .reduce((acc, ele, i, arr) => acc + ele / arr.length, 0); 
      
const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(data1, data2) */
/* const firstWithdrawal = movements.find(mov => mov < 0 );
const account = accounts.find(acc=> acc.owner === 'Jessica Davis');
console.log(account);
for (let a  of accounts){
    accounts.find(a => a.owner === 'Jessica Davis');
    console.log(a)
}
 */

//btnLogin


btnLogin.addEventListener('click', function(e){
  console.log(`hello`);
  //Experimenting API
  //console.log(new Intl.DateTimeFormat('en-US', options).format(now))
  e.preventDefault();
 // console.log('LOGIN');
  //day / month / year

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === +inputLoginPin.value){
    //Display and Ui message
    labelWelcome.textContent = `Welcome back, 
    ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    const now = new Date();
  const options = {
    hour : 'numeric',
    minute : 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  };
  //const locale = navigator.language;
  //console.log(locale);

  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    //date and time
/*   const now  = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0)
  const year = `${now.getFullYear()}`.padStart(2, 0);
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2,0);
  labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}` ;  */
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur()

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
   
  //  console.log('LOGIN');
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 &&
    receiverAcc && 
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username)
      {
        //Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        //console.log('Transfer valid');
        currentAccount.movementsDates.push(new Date().toISOString())
        receiverAcc.movements.push(new Date().toISOString())
        //Update Ui   
        updateUI(currentAccount);
        //ResetTimer
        clearInterval(timer);
        timer = startLogOutTimer();
      }   
  //console.log(amount, receiverAcc);
});
btnClose.addEventListener('click', function(e){
  e.preventDefault();
  inputCloseUsername.value = inputClosePin.value = '';
  console.log("Account Close button pressed");
  if(inputCloseUsername.value === currentAccount.username
    && +inputClosePin.value === currentAccount.pin
    ){ 
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
        );
      //delete account
     accounts.splice(index, 1)
     //hide ui
     containerApp.style.opacity = 0;
    };
    inputCloseUsername.value = inputClosePin.value = '';

})

/* console.log(movements);
//console.log(movements.includes(-130));
const anyDeposits = movements.some(mov => mov === -130);
console.log(anyDeposit *//* s); */

btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    console.log("loan button is clicked");
    const amount = +inputLoanAmount.value;
    if(amount > 0 && currentAccount.movements
      .some(mov => mov >= amount * 0.1)){

        setTimeout(function(){
          currentAccount.movements.push(amount);
          currentAccount.movementsDates.push(new Date().toISOString())
      
          updateUI(currentAccount);
          clearInterval(timer);
          timer = startLogOutTimer();
        },2500);

      }
      inputLoanAmount.value = '';
  });


let sorted = false;

btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
  })

labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );
  console.log(movementsUI)

// const movementsUI2 = [...document.querySelectorAll('.movements__value')];
})  
//
const { deposits , withdrawals } = accounts
.flatMap ( acc => acc.movements )
. reduce (
( sums , cur ) => {
   sums[ cur > 0 ? ' deposits ' : ' withdrawals ' ] += cur ;
   return sums;
  } ,
    {   deposits : 0 , withdrawals : 0 }
);

     

//title case
const convertTitleCase = function(title){
  const titleCase = title
                      .toLowerCase()
                      .split(' ')
                      .map(word => word[0].toUpperCase() + word.slice(1)
                    );
        return titleCase;
}
//console.log(convertTitleCase("atik salim rangnekar"));
//Asynchronous / continuous javascript

/* const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout((ing1, ing2) => 
console.log(`This is your pizza with ${ing1} and ${ing2} `), 3000, ...ingredients);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); */

//setTimeInterval
/* setInterval(function(){
  const now = new Date();
  const seconds = now.getSeconds()
  console.log(seconds);
}, 1000); */

const calcAverageHumanAge = function(ages){
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults)
}
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
console.log(avg1, avg2)
