class Car{
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }
    accelerate(){
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/hr`);
    }
    
    brake(){
        this.speed -= 5
        console.log(`${this.make} is going at ${this.speed} km/hr`)
    }
    get speedUS(){ //get method does not like parameters;
        return this.speed/ 1.6    
    }
    set speedUS(speed){//requires only one argument
        return speed * 1.6
    }

}

const lambo = new Car("lambo",120);
console.log(lambo.speedUS);
lambo.speed = 120
console.log(lambo)