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
    }
    withdraw(val){
      this.deposit(-val);
    }
    _approveLoan(val){
      return true;
    }
    requestLoan(val){
      if(this._approveLoan(val)){
        this.deposit(val);
        console.log(`Loan approved`)
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
  