// console.log(`Hello`);
// console.log(`I like pizza`);

// window.alert(`This is an alert!`);
// window.alert(`I like Pizza!`);

document.getElementById("myH1").textContent = `Hello`;
document.getElementById("myP").textContent = `I like Pizza!`;

// number
let age = 23;
let b = 100;

// string
let firstName = "Acxell";

// boolean
let online = true;

console.log(`total is ${age+b}`);
console.log(typeof b);
console.log(`my name is ${firstName}`);
console.log(typeof firstName);
console.log(`Is User online : ${online}`)
console.log(typeof online);

// calling in html view
document.getElementById(`name`).textContent = firstName;
document.getElementById(`age`).textContent = `Your age is ${age}`;
document.getElementById(`status`).textContent = `User status online is ${online}`;

// Aritmathics
let dogs = 25;

//dogs = dogs + 2;
//dogs = dogs - 2;
//dogs = dogs * 2;
//dogs = dogs / 2;
let total = dogs + 2 * 2;

console.log(total);
//dogs **= 2;
//dogs %= 2;

// looping conditions 
//dogs++;
dogs--;


console.log(dogs);

let address;

// address = window.prompt(`Give me ur address`);

// button functions
document.getElementById("mySubmit").onclick = function(){
    address = document.getElementById("address").value;
    console.log(address);
    document.getElementById(`myAddress`).textContent = `Ur Home is in ${address}`
}
// this is a comment

/* This is a comment */

// Conversion

document.getElementById("miniButton").onclick = function(){
    let test;
    test = document.getElementById("test").value;
    test = Number(test);
    // test = Boolean(test);
    // test = String(test);
    test++;
    console.log(test);
    document.getElementById(`myTest`).textContent = test;
};