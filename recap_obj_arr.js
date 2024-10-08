// Description: This file is used to demonstrate the use of object in javascript.
const person = {
	  name: "John",
	  age: 30
}

const selection = 'name'; 

console.log(person.name);		// John
console.log(person['name']);	// John
console.log(person[selection]);	// John
console.log(typeof person);	// object
console.log(person);	// { name: 'John', age: 30 }

// Arrays
let array = [1, 2, "John", true, undefined, null];
console.log(array[4]);	// undefined
array = 1;
console.log(array);	// 1

const array2 = [1, 2, 3, 4, 5];
array2[5] = 10;
console.log(array2); // [1, 2, 3, 4, 5, 10]

console.log(2 === Number('2')); // true

console.log(...array2); // 1 2 3 4 5 10

const array3 = [...array2];
console.log(array3); // [1, 2, 3, 4, 5, 10]

array3[1] = 'changed';
console.log(array3); // [1, 'changed', 3, 4, 5, 10]
console.log(array2); // [1, 2, 3, 4, 5, 10]

const array4 = [...array3, 20, 30, 40];
console.log(array4); // [1, 'changed', 3, 4, 5, 10, 20, 30, 40]