'use strict';

//create constructor
//constructor starts with capital letter
//const Person = function(firstName, birthYear){
//console.log(this);
//Instance properties
// this.firstName = firstName;
// this.birthYear = birthYear;
//Not to create method inside a constructor
/* this.calcAge = function(){
        console.log(2037 - this.birthYear);
    } */
//};

//const jonas = new Person('Jonas', 1991);
//console.log(jonas);
//1. New {} is created
////2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically returns {}

//const atik = new Person("Atik", '2001');
//console.log(atik);
//returns boolean value
//console.log(atik instanceof Person)

//Prototype
//console.log(Person.prototype)
//Person.prototype.calcAge = function(){
//console.log("hello")
//}
//jonas.calcAge();
//atik.calcAge();

//see jonas prototype
//console.log(jonas.__proto__);
//check if jonas prototype belongs to person contructor prototype
//console.log(jonas.__proto__ === Person.prototype);
//console.log(Person.prototype.isPrototypeOf(jonas));//returns true
//console.log(Person.prototype.isPrototypeOf(Person));//returns false

//.prototypeOfLinkedObjects
//Person.prototype.species = 'Homo Sapiens'
//console.log(jonas, atik)
//console.log(jonas.hasOwnProperty('firstName'));
//console.log(jonas.hasOwnProperty('species'))// return false because of prototype

//console.log(jonas.__proto__);
//console.log(jonas.__proto__.__proto__);//returns constructor
//console.log(jonas.__proto__.__proto__.proto__);//returns null
//console.dir(Person.prototype.constructor);//returns to function

const ay = [3, 6, 4, 5, 9, 3];
//console.log(ay.__proto__ === Array.prototype);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

//console.log(ay.unique());

//ES6 Classes

//class expression
//const PersonCl1 = class{};
/*
class PersonCl{
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
    //instance methods
    calcAge(){
        console.log(2022 - this.birthYear);
    }
    //static methods
    static hey(){

        console.log("Hey there🍕")
    }
}
*/

//const jessica = new PersonCl('Atik', 1996);
//console.log(jessica);
//jessica.calcAge()

//this returns true
//console.log(jessica.__proto__ === PersonCl.prototype);

//1. Classes are not Hoisted
//2. Class are first-class citizens
//3. Classes are executed in strict mode

const account = {
  owner: 'atik',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(
    mov //need atleast one parameter
  ) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

//creating a static function
//this method is not inherited by other objects;
/* Person.hey = function(){
    console.log("Hey there🍕");
} */
//PersonCl.hey();
//jonas.hey();

//216.
//prototype creation links to Object.create4
//Works different than classes and constructor
/*
const PersonProto = {
  calcAge() {
    //   console.log(2022 - this.birthYear);
  },
  init(firstName, birthYear) {
    //this method does not have anything to do with constructor
    this.firstName = firstName;
    this.birthYear = birthYear;
    console.log(
      `This is my ${firstName} and this is my birthYear is ${birthYear}`
    );
  },
};
*/
//Object create
/* const Muhammed = Object.create(PersonProto);
console.log(Muhammed);

Muhammed.name = 'Muhammed';
Muhammed.birthYear = 1999;

Muhammed.calcAge(); */

//returns true
/* console.log(Muhammed.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge(); */

/* const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
}
Person.prototype.calcAge = function(){
    console.log(2022 - this.birthYear);
}
const Student = function(firstName, birthYear, course){
    Person.call(this, firstName, birthYear)
    
    this.course = course; 
};

Student.prototype = Object.create(Person.prototype);


Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', '2001', 'Computer Science');
mike.introduce();
mike.calcAge();


Student.prototype.contructor = Student;
console.log();
 */

//220.
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //instance methods
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  set fullName(name) {
    if (name.includes('')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  get fullName() {
    return this._fullName;
  }
  //static methods
  static hey() {
    console.log('Hey there🍕');
  }
}
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //Always need to happen first!
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(`I am ${2022 - this.birthYear} year old`);
  }
}

const atik = new StudentCl('atik rangnekar', 2001, 'Computer Science');
atik.introduce();
atik.calcAge();

const muhammed = new StudentCl('gamti', 1997, 'pubg');
muhammed.introduce();
/* 
const PersonProto = {
  calcAge(){
    console.log(2022 - this.birthYear);
  },
  init(fullName, birthYear){
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
};

const steven = Object.create(PersonProto);


const StudentProto = Object.create(PersonProto);
StudentProto.init = function(fullName, birthYear, course){
  PersonProto.init.call(this, fullName, birthYear);
  this.course = course;
}

StudentProto.introduce = function(){
  console.log(`my name is ${this.fullName} and I study ${this.course}`)
}
const jay = Object.create(StudentProto);
jay.init('Jay', 2019, 'Computer Science');
jay.introduce();
jay.calcAge(); */

//224
// Public fields
// Private fields
// public methods
// Private methods
// Also a static function
class Account{
  //[1] public fields (instances)
  locale = navigator.language;
  
  // 2. Private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin){
    this.owner = owner;
    this.currency = currency;
    //protected property
    this.#pin = pin;

    /* this._movements = [];
    this.locale = navigator.language; */
    
    console.log(`Thanks for opening an account, ${owner}`);
  }
  //public interface
  getMovements(){
    return this.#movements;
  }
  deposit(val){
    this.#movements.push(val);
    return this;
  }
  withdraw(val){
    this.deposit(-val);
    return this;
  }
  _approveLoan(val){
    return true;
  }
  requestLoan(val){
    if(this._approveLoan(val)){
      this.deposit(val);
      console.log(`Loan approved`)
      return this;
    }
  }
  static helper(){
    console.log('Helper');
    }
  //Private methods
  #approveLoan(val){
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
/* acc1.movements.push(250);
acc1.movements.push(-140); */
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
console.log(acc1.pin);
//returns error 
//this means movements and pin are protected
//console.log(acc1.#movements);
//console.log(acc1.#pin);
//console.log(acc1.#approveLoan(100));
Account.helper()

//chaining 
//return method sets the chaining method
acc1.deposit(300).deposit(500).withdraw(35).
requestLoan(25000).withdraw(4000);

console.log(acc1.getMovements());
class CarCl{
  constructor(make, speed){
      this.make = make;
      this.speed = speed;
  }
}
class EVCL extends CarCl{
  #charge;
  constructor(make, speed, charge){
      super(make, speed);
      this.#charge = charge;
  };
  accelerate(){
      this.speed += 10;
      this.#charge -= 1;
      console.log(`${this.make} going at ${this.speed}km/hr, with a charge of ${this.#charge}`);
      return this;
  };
  chargeBattery(chargeTo){
      this.#charge = chargeTo;
      return this;
  };
  brake(){
      this.speed -= 5;
      console.log(`${this.make} is going at ${this.speed}km/hr`);
      return this
  }
}

const tambo = new EVCL('Ford', 120,23)
console.log(tambo
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(25));