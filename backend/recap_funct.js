function sayHello(name) {
	console.log('Hello', name);
}
sayHello('John');	// Hello John

function double(num) {
	return num * 2;
}
console.log(double(3));	// 6


// ES6 arrow function
const triple = (number) => {
	return number * 3;
}
console.log(triple(3));	// 9

const quadruple = number => number * 4;
console.log(quadruple(3));	// 12
console.log(quadruple("a"));	// NaN

const combine = letter => letter + 2;
console.log(combine("3"));	// 32
console.log(combine(3));	// 5

// template literals
const greet = (name, timeofday) => {
	console.log("Hello", name, ", it is a beautiful", timeofday);
}
greet("John", "morning");	// Hello John, it is a beautiful morning

const greet2 = (name, timeofday = 'afternoon') => {
	console.log(`Hello ${name}, it is a beautiful ${timeofday}`);
}
greet2("John", "morning");	// Hello John, it is a beautiful morning
greet2("John");	// Hello John, it is a beautiful afternoon


// distructuring
const person = {
	name: "Mark",
	age: 30
}
const { name, age } = person;
console.log(name);	// John
console.log(age);	// 30

const{ name: personName, age: personAge } = person;
console.log(personName);	// John
console.log(personAge);	// 30

const [a, b] = [1, 2];
console.log(a);	// 1

// Important functions
const numbers = [8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
	console.log(numbers[i]);
}

numbers.forEach(element => {
	console.log(element);
});

for (let number of numbers) {
	console.log(number);
}

numbers.map(number => {
	console.log(number);
});

const doubled = numbers.map(number => number * 2);
console.log(doubled);	// [16, 18, 20]

const filtered = numbers.filter(number => number > 8);
console.log(filtered);	// [9, 10]

const sum = numbers.reduce((acc, number) => acc + number, 0);
console.log(sum);	// 27