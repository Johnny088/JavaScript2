//---------------------------- task1 -----------------------
const hero = {
  name: 'Link',
};

function sayName() {
  console.log('Hero:', this.name);
}

// Завдання: викликати sayName так,
// щоб вона надрукувала "Hero: Link"

console.log('task 1');
sayName.call(hero);

//---------------------------- task2 -----------------------

const player = {
  nickname: 'Shadow',
};

function introduce(level, rank) {
  console.log(`${this.nickname} — level ${level}, rank ${rank}`);
}

// Завдання: викликати introduce так, щоб вийшло:
// "Shadow — level 27, rank Gold"

console.log('task 2');
introduce.call(player, 27, 'Gold');

//---------------------------- task3 -----------------------
console.log('task 3');

const calc = {
  name: 'calc1',
};

function sum(a, b, c) {
  console.log(`${this.name} result =`, a + b + c);
}

const nums = [4, 2, 10];

// Завдання: викликати sum для calc,
// передавши nums через apply

//sum.apply(calc, [...nums]);
sum.apply(calc, nums);

//---------------------------- task4 -----------------------

const robot = {
  id: 'RX-77',
  start() {
    console.log('Robot', this.id, 'started');
  },
};

const startFn = robot.start;

// Завдання: створити нову функцію correctStart,
// у якої this завжди буде robot (через bind),
// і викликати її.
