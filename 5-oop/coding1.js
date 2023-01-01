const Car = function(make, speed){
    this.speed = speed;
    this.make = make;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
}

Car.prototype.brake = function(){
    this.speed -= 5
    console.log(`${this.make} is going at ${this.speed} km/hr`)
}

const lambo = new Car("lambo", 120);
console.log(lambo)

lambo.accelerate();



//
