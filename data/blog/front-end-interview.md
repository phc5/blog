---
title: 'Front End Interview'
date: '2020-04-28'
tags: ['tech', 'front-end']
summary: 'Various front-end related questions answered.'
---

## HTML

### What is the DOM?

The DOM stands for Document Object Model. It is a tree that represents an XML or HTML document where each node is an object representing a part of the document. DOM methods allows programmatic access to the tree and allows you to change the structure, style, and/or content of the document.

## JS

### How Does JS work?

Lets talk about the JavaScript engine: V8. V8 was designed to increase the performance of JS in the browser. To achieve high speed, V8 takes your JS code, converts it into an AST, translate it into byte code via an interpreter, and translates it into byte code if optimizable.

JavaScript is single threaded meaning it can only do one thing at a time: it has only one call stack. The state of the call stack translates to where in the code you currently are. When you execute a function, you push it to the top of the stack and when you exit, you pop it off the stack.

There is a problem with being single threaded. What happens when you have a stack frame in the call stack that takes a long time? The browser will be blocked from doing anything while the function is executing. How can we run heavy code without blocking the UI/browser? Asynchronous callbacks.

The Event Loop handles the execution of multiple chunks of your program over time. It runs continually and monitors the Call Stack, the Callback Queue, and the Microtask Queue. If the Call Stack is empty, the Event Loop will check the Microtask Queue and then the Callback Queue and take an event from them respectively and push it to the Call Stack.

Microtasks are tasks that should happend immendiately after the currently executing script. Microtasks are pulled from the Microtask Queue at the end of each task and at the end of every callback (task and microtask). Microtasks include mutation observer callbacks and promise callbacks. Once a promise settles, it queues a microtask into the Microtask Queue.

### What is closure?

Closure is the combination of a function bundled together with references to its surrounding state (lexical environment). A closure gives you access to an outer function's scope. Closures are important because they control what is and isn't in scope of a function.

In JS, functions are not just functions, they are also closures! What that means is the function body has access to variables outside of the function. For example,

```js
const me = 'Paul';

function greetMe() {
  console.log(`Hello ${me}`);
}

// Hello Paul
greetMe();
```

Applications include data privacy, partial application, closures, etc...

Currying: is a function that takes multiple parameters as input and returns a function with exactly one parameter.

```js
let dog = name => breed => age => `${name} is a `${breed} and is ${age} years old.`;

// Kora is a Australian Shepherd and is 2 years old.
console.log(dog('Kora')('Australian Shepherd')('2'));
```

### What is the difference between `.call` and `.apply`?

Both of these methods are used to invoke functions and take in a `this` value for the first parameter that will be used within the function. For the subsequent arguments, `.call` takes in comma-separated arguments while `.apply` takes in an array of arguments as the next argument.

```js
function sayMyName(firstName, lastName) {
  return `Hi, ${firstName} ${lastName}`;
}

console.log(sayMyName.call(null, 'Paul', 'Chong'));
console.log(sayMyName.apply(null, ['Paul', 'Chong']));
```

### What does `Function.prototype.bind` do?

`.bind` creates a new function that, when called, as its `this` set to the provided value.

```js
var x = 1;
const a = {
  x: 2,
  getX: function () {return this.x};
}

const retrieveX = a.getX();
retrieveX() // returns 1 because this function was called in the global scope and this === 1

const boundedRetrieveX = retrieveX.bind(a);
boundedRetrieveX() // returns 2 because this is set to "a".
```

### Explain "hoisting"

Hoisting is a term used to explain the behavior of variable declarations in your code as being "moved up" to the top. However, only the declarations are hoisted, the assignment will stay where it was declared.

There are some caveats:

1. Function declarations are hoisted and so is the function's body.
2. Function expressions body is not hoisted, only the variable it was assigned to.
3. `var` variables are hoisted but not their values.
4. `let` and `const` variables are hoisted but they are not initialized and accessing them will result in a `ReferenceError`

### Difference between `==` and `===`

If the value types being compared are different, `==` allows coercion before the comparison whereas `===` does not.

### Synchronous vs Asynchronous functions

Synchronous functions are blocking and are executed in the order of the statements. Execution of the program is paused if one of the statements take too long.

Asynchronous functions usually accept a callback as a parameter and execution continues on the next line immediately after the asynchronous function is invoked. The callback is only invoked after the asynchronous operation is complete and the call stack is empty.

### Differences between `var`, `let`, and `const`

`var` variables are scoped to the function in which they were created or if created outside a function to the global object. `var` variables are hoisted, but their values are not.

`let` and `const` are block scoped meaning that they are only accessible within the nearest set of curly braces. `let` and `const` variables are hoisted, but they are not initialized.

### Arrow function vs nomral function declaration

### Promises

Promises are objects that produces a single value some time in the future: either a resolved value or an rejected value. Promises have 3 possible states: pending, fulfilled, or rejected.

### Composition Over Inheritance

Inheritance is designing your types around what they are, while composition is designing around what they do. Inheritance kind of locks you in because it encourages you to build a taxonomy of objects early on in your project and you're probably going to make big mistakes while doing that because we can't predict the future. Composition allows you to be more flexible and powerful.

### Functional Programming

FP is the method in which you write programs by composing functions and avoiding shared state and mutating data. FP tends to favor declarative programming (what you do) over imperative (how do i do something).

- Pure functions:
- Function Composition: think recompose.
- First class functions:

## Random bits of knowledge💡

### What happens when you type https://google.com/

1. Browser parses the URL:

- protocol -> https
- domain -> google
- resource -> /

2. DNS lookup:

- browser checks if DNS record is in its cache to find IP address
  - first checks the browser's cache, if not here then
  - checks OS cache, if not here then
  - checks router cache, if not here then
  - goes to ISP's cache

3. If not in any of the above caches, ISP's DNS server initiates a DNS query to find IP of server that hosts google.com
4. Browser opens a TCP connection with the server (IP address above)

- to transfer data packets between your browser and the server you need to have a TCP connection established: TCP/IP 3-way handshake.

5. Browser sends an HTTP request to the server

- sends a GET for google.com '/' with necessary headers

6. Server handles request and sends back response.
7. Browser displays content

### HTTP and HTTP/2

HTTP is a protocol which allows the fetching of resources such as HTML documents.

### Web Page Rendering and Pixel Pipeline

Quick Overview of browsers actions when rendering a page:

1. The DOM is formed from the HTML.
2. Styles are loaded and parsed which forms the CSSOM.
3. Style: This is the where the browser figures out which CSS rules apply to which elements based on matching selectors. Once the rules are known, they are applied and the final styles for each element are calculated.
4. Layout: Once the browser knows which rules to apply to which element it can begin to calculate how much space the element takes up and where it is on the screen. Since each element can affect other elements, this process can be heavy so minimize moving things around.
5. Paint: This is where the browser fills in the pixels with text, colors, images, border, etc... Painting is often done on multiple layers.
6. Composite: We could have multiple layers from the previous step and compositing is where we draw the layers on the screen in order so that the page renders correctly.
