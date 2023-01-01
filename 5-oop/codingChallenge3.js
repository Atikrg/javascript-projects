/*
DATA CAR 1: 'Tesla' going at 120km/hr, 
with a  charge of 23%
*/
const Car = function(make, speed){
    this.speed = speed;
    this.make = make;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    this.charge -= 1;
    console.log(`${this.make} going at ${this.speed}km/hr, with a charge of ${this.charge}`);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/hr`);
}

const EV = function(charge, make, speed){
    Car.call(this, make, speed)

    this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
    console.log(this.charge);
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed} km/hr with a charge of ${this.charge}%`)
}



const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();
console.log(tesla);
tesla.accelerate();
