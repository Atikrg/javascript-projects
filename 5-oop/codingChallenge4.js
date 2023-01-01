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

//rivian.chargeBattery(23);