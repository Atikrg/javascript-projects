'use-strict';

/** with Object.freeze we cannot mutate the object
 * 1. We can change the value of an object
 * eg- budget[0].value = 100000;
 *
 * 2. But we cannot add the value to an object
 * eg- budget[9].value = 20000;
 */

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//making this object immutable means cannot add properties
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

spendingLimits.jay = 200;

// here the object doesn't mutate
console.log(spendingLimits.jay);

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
  ) {
    const cleanUser = user.toLowerCase();

  /*  let lim;
  if (spendingLimits[user]) {
    lim = limits[user];
  } else {
    lim = 0;
  } */

  const getlimit = (limits, user) => limits?.[user] ?? 0;
  
  return value <= getLimit(limits,cleanUser)
    ? [...state, { value: -value, description: description, user: cleanUser }]
    : state;
    /*  budget.push({ value: -value, description: description, user: user }); */
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

console.log(newBudget1);

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
  );

console.log(newBudget2);

const newBudget3 = addExpense(
  newBudget2,
  budget, 
  spendingLimits, 
  200, 
  'Stuff', 
  'Jay');

  console.log(newBudget3);
  
  console.log(newBudget1);

  const checkExpenses = function (state, limits) {
  return state.map(entry => {
    entry.value <- -getLimit(limits, entry.user)
    ? {...entry, flag:'limit'}
    :entry
  })
 // for (const entry of newBudget3) {
    //  let lim;
    /*    if (spendingLimits[entry.user]) {
      lim = spendingLimits[entry.user];
    } else {
      lim = 0;
    } */
    /* const limit = spendingLimits?.[entry.user] ?? 0; */
    
 //   if (entry.value < -getLimit(entry.user)) {
      // console.log(typeof(+lim))
   //   entry.flag = 'limit';
 //   }
 // }
};
/* checkExpenses();
checkExpenses(newBudget3, spendingLimits);
console.log
 */
//console.log(budget);


const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);


//Impure
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
  .filter(entry => entry.value <= -bigLimit)
  .map(entry => entry.description.slice(-2))
  .join("/");
//  let output = '';

//reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
console.log(bigExpenses);

  /*  for (const entry of budget) {
    output +=
    entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';
    if (entry.value <= -bigLimit) {
      output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output); */
};

console.log(budget);
logBigExpenses(500);
