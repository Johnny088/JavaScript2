const f = function () {
  console.log(this);
};
f();

const user = {
  name: 'Johnny',
  getName() {
    console.log(`hello, I'm ${this.name}`);
  },
};

user.getName();
user.getNameByFunction = f;
user.getNameByFunction();

const bmw = {
  brand: 'bmw',
  speed: 150,
};

const drive = function (city, name) {
  console.log(this);
  console.log(`hello ${name}`);
  console.log(`${this.brand} drives with speed ${this.speed} to ${city}`);
};

// console.log(`just method`);
// drive();    // mistake with a strict or type module
console.log(`method call`);
drive.call(bmw, 'Miami', 'Johnny');
console.log(`method apply`);
drive.apply(bmw, ['Miami', 'Johnny']);

console.log(`method bind`);
const driveBMW = drive.bind(bmw);

driveBMW('Miami', 'Johnny');

// ---------------- prototypes ---------------------
console.log('Prototypes');

const person = {
  eyes: 'blue',
};

const johnny = Object.create(person);
console.log(johnny);
console.log(johnny.eyes);
johnny.weight = 70;
console.log(johnny);

console.log(person.isPrototypeOf(johnny)); // true
console.log(johnny.isPrototypeOf(person)); //false
