// Block-scoped variables (let)
let x = 3;
function func(randomize) {
    if(randomize) {
        let x = Math.random();
        return x;
    }
    return x;
}
var res = func(false);

// Arrow functions (TODO: Make example illustrate that 'this' is not shadowed)
var arr = [10, 12, 14];
arr = arr.map(v => v * res);

// Destructing (multiple return values in a array-like structure)
var str = "(john, jane) --> (junior)";
let [, parent1, parent2, child] =
    /^\((\w+),\s(\w+)\)\s-->\s\((\w+)\)$/.exec(str);

// Destructing (objects instead of list, notice braces instead of square-brackets)
var obj = { name: "john", age: 42 }
let {name, age} = obj;

// For-of loop
for (let elem of arr) {
    // Do nothing, we need indexes.. but we can "break" unlike arr.forEach :o
    break;
}

// For-of loop (with indexes through "arr.entries" and destructing)
for (let [i, elm] of arr.entries()) {
    arr[i] = elm + 1;
}

// Default values for optional parameters
function multiply(val, alpha=3.14) {
    return val * alpha;
}
let dopi = multiply(2);
let dotwo = multiply(2, 2);

// Named parameters through object literal and destructing
function multiply2({ val, alpha=3.14 }) {
    return val * alpha;
}
let dopi2 = multiply2({ val:2 });
let dotwo2 = multiply2({ val:2, alpha:2 });

// Rest parameters
function multiMatch(pattern , ...strs) {
    let output = [];
    for (let str of strs) {
        let o = pattern.exec(str);
        output.push(o[1]);
    }
    return output;
}
var parents = multiMatch(/\*\|(\w+)\|\*/, "*|JOHN|*", "*|JANE|*");
var children = multiMatch(/\*\|(\w+)\|\*/, "*|JUNIOR|*");

// Using "arrow function" and "arr.map" to make a shorter, but perhaps less interpretable implementation
var strs = ["*|JOHN|*", "*|JANE|*"];
var parents2 = strs.map(s => /\*\|(\w+)\|\*/.exec(s)[1] );

// Spread operator (Turn array into parameters, like ".apply" in ES5)
var parents3 = multiMatch(/\*\|(\w+)\|\*/, ...strs);

// Concat using spread operator
var family = [...parents, ...children];

// Base classes
class Person {
    constructor(first_name, last_name) {
        this.first_name = first_name;
        this.last_name = last_name;
    }

    describe() {
        return `Person named "${this.first_name} ${this.last_name}"`;
    }
}
var jane_person = new Person("Jane", "Doe");

// Derived classes
class Parent extends Person {
    constructor(first_name, last_name, no_of_children) {
        super(first_name, last_name);
        this.no_of_children = no_of_children;
    }
    describe() {
        let child_noun = this.no_of_children === 1 ? "child" : "children";
        return `${super.describe()} with ${this.no_of_children} ${child_noun}`;
    }
}
var john_parent = new Parent("John", "Doe", 1);

// Subclass of built-in constructors, such as "Error"
class ParseError extends Error {

}

// Method definitions
let mathUtil = {
    multi(a,b) {
        return a * b;
    }
};
var dotwo3 = mathUtil.multi(2, 2);

// Built-in "Map" data structure (instead of using objects and risking constructor and __proto__ collision)
let map = new Map();
map.set("blue", "1e90ff");
map.set("green", "2e8b57");
let green = map.get("green");

// Modules with multiple exports (see separate file "module.js")
import { extMultiply, extDivide } from './myModule.js';
import * as extModule from './myModule.js';
var dotwo4 = extMultiply(2, 2);
var dotwo5 = extModule.extMultiply(2, 2);

// Modules with single exports
import extModule2 from './myModule2.js';
var module2 = extModule2(2);
var dotwo6 = module2.multiply(2);

// Template literals (multi-line and no concatenation)
console.log(
`Result: ${res}
Array: [ ${arr} ]
Parent 1: ${parent1}
Parent 2: ${parent2}
Child: ${child}
Name: ${name}
Age: ${age}
Double PI: ${dopi} (${dopi2})
Double Two: ${dotwo} (${dotwo2}) (${dotwo3})
Parent matches: ${parents} (${parents2}) (${parents2})
Children matches: ${children}
Family matches: ${family}
Jane person: ${jane_person.describe()}
John parent: ${john_parent.describe()}
Green: #${green}`
);