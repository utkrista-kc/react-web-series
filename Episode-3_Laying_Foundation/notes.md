# Episode 3: Laying the foundation

1. Instead of using npx parcel index.html every time, we will create a script in package.json. We can do as follows: 
``` 
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
    "test": "jest"
  }
```
We can use npm run start or npm start thenafter. For production, we will use npm run build, npm build will not work.

2. DOM elements are HTML elements. They are equivalent to React elements but React element is not HTML element. React.createElement takes three arguments. The first it html tag that you want to create. The second one is attribute(props) and last one is children. React element is an object, when we render this element into the DOM, then it becomes HTML element. root.render converts React element to HTML and push it to browser. What is there inside div root contents will be replaced.

3. JSX is JS syntax that is easier to create React elements. JSX is not a part of React. We can write React code without JSX but JSX makes our life easier. JSX is not HTML inside javascript. JSX is different than HTML. JSX is HTML or XML like syntax. JSX is not pure Javascript. JS engine does not understand JSX. JS engine understands ES standards. If browsers is not able to understand JSX, how is it working? This is transpiled before it reaches to JS engine by the parcel (bundler). Parcel gives responsibility of transpiling to babel. Transpiled means code is converted to the code that browser understands. Babel is not created by Facebook. JSX code is transpiled to React.createElement => ReactElement - JS Object => HTML element (render). Babel is opensource JS compiler. Babel job is not just converting JSX to React.createElement. Babel also does transpilation so that older version understand the code. Babel at the end of day is JS library. In JSX, to give a class name, we need to write className. Attributes given to JSX is given in camelcase. If we have to write JSX in multiple lines, we have to wrap in () brackets. It is because babel needs to understand when JSX starts and ends.

4. It is said that everything is component in React. Two type of components ( Class Based Components and Functional Components). Class based components - old way of writing code. Functional components is new way of writing code. Legacy projects written in class based components. React functional component is normal JS function that returns some JSX element (React element) or nested elements.
We can write both type of syntax in React. Both are valid.
```
const HeadingComponent = () => {
  return <h1>Namaste React Functional Component.</h1>;
};
// If multiple lines, we use () brackets below.
const HeadingComponent2 = () => <h1>Namaste React Functional Component.</h1>;

//React element
const heading = (
  <h1 id="heading" className="head">
    Namaste React using JSX
  </h1>
);
```
We cannot render a React component using root.render() as it is for rendering a react element. We can render using the following syntax such that babel understands.
```
root.render(<HeadingComponent />);

```
React elements can also be loaded into the component using same format.
Combining two components into one is component composition. For example, putting one component into another. We can also use normal functions instead of arrow functions. But arrow function is new way and cleaner way.
```
const Title = function () {
  return (
    <h1 id="head" tabIndex="5">
      Namaste React using JSX
    </h1>
  );
};
```
Inside JSX, giving curly braces {}, we can write any piece of JS code. In order to import normal React element, we can use as follows: 
```
const title = (
  <h1 id="head" tabIndex="5">
    Namaste React using JSX
  </h1>
);

// React Component
const HeadingComponent = () => (
  <div id="container">
    {title}
    <h1>Namaste React Functional Component.</h1>
  </div>
);
```
In order to put React element inside element, we can use the similary way. We can also inject component inside a react element.
If an attacker runs malicious code inside {}, it can steal cookies, and can do lot of things. But JSX takes care of these injection attacks. Even if some malicious code is passed in {}, JSX will sanitize the values and pass it. It will prevent cross-side scriptint attacks.

We can also import React components in this manner ```<Title></Title> or <Title />``` Each way has its own advantages.
We can also call the components using this format ```{Title()}``` JSX makes the code readable.


# Theory Assignment

1. What is JSX?
It is not HTML. It is syntax extension to Javascript. One might find JSX similar to HTML but it comes with full power of 
Javascript. JSX produces React elements. Instead of separating logic and markup in separate files, React allows it with units known as components. React don't require using JSX but it is helpful for developers. Since, JSX is closer to JS than HTML, ReactDOM uses camelCase property naming conventions unlike HTML attribute names. Babel compiles JSX to React.createElement() calls.

2. Super powers of JSX
Escaping in HTML means replacing some special characters with others. In HTML, you replace "<", ">", "", & etc.
It is safe to render user input in JSX. It is because, ReactDOM escapes any values embedded in JSX before rendering them.
So, we cannot inject anything except what is written in application. Everything is converted to string before being rendered.
This prevents XSS(Cross-site-scripting) attacks.

3. Role of type attribute in script tag? What options can I use there?
It represents type of content in between <script></script> tag. We can use async, defer, crossorigin, src, type, refererpolicy, etc.
```<script type="module"> represent that module is being pointed.```

4. 
```
{TitleComponent} vs {<TitleComponent />} vs {<TitleComponent></TitleComponent>} in JSX
{TitleComponent} - to load a element
{<TitleComponent />}
 {<TitleComponent></TitleComponent>} - both to load component```

# Additional

* Polyfill
It is a piece of code (usually JS) used to provide modern functionalities on older browsers that donot natively support.
It is essential to provide common API that worked in all browsers. In the past, there was problem to have project work on all devices. Nowadays, using polyfill for browser-specific implementation is less common because, modern browsers implement broad set of APis according to standard semantics. If some functionalities are not understood by browsers, our code is converted to older code that browser understand. Babel converts our code to older code. There are latest updates on lets say es6, we use. But there might be some browsers that donot support that. So, polyfills are piece of code that gives similar functionality as we use in latest update of es6 to the older browser versions.

* Babel
It is a JS compiler.It is a toolchain used to convert new version of code to backward compatible version of JS in current and older browsers environment. Babel transforms syntax, polyfill features that are missing in target environment, source code transformation and more. It is a famous transpiler. It coverts latest JS code into one that the browser understand. It gives us privilege to make use of latest JS that offers without worrying whether it will work on browser or not.

* Transpiler
It is a tool to convert source code to another source code of same level. So, it is also known as source to source compiler.

* When using parcel and babel, console logs are not automatically not removed. So, there is package that removes,
babel-plugin-transform-remove-console.

* Functional component is nothing but a JS function that returns JSX or react element or composition of react element or component.
Functional component name starts with capital letter.
We can also skip to write return. It is arrow function thing.
```
function => () => ()
function => () => {return ()}
```

* Component Composition - Nested Components
React has powerful composition model so in order to reuse components, we  need to use component composition instead of inheritance. They donot recommend using inheritance hierarchies for creating components.

* React Reconciliation (OfficialDoc)
React diffing algorithm makes component updates faster for high performance apps. When render() function is called, 
React is creating a tree of React elements. When another time, render function is called, new tree is created. Here, React
needs to figure out optimal way of applying updates on real DOM based on the recent tree. So, there are some solutions like
state of art alogrithms takes O(n^3) where n is the number of elements in tree. If React has 1000 elements in tree, it is costly
for comparison. React implements heuristic O(n) algorithm with two assumptions:
> two elements of different type will have different tree
> children elements will have a key

When root elements have different tree, old DOM nodes are destroyed and new are created. When DOM elements has same type, React looks at DOM attributes and only updadtes the attribute changes.In case of children, if no key is provided, when adding items at start of list, it will re-render everything as it doesnot know what element it can persist. In order to solve this, React supports key attribute. The key should be unique among siblings, not globally. If no options, we can use index as key but only if there is no need of items to be re-ordered. If they need to be re-order, the process will be slow. Keys should be stable, predictable and unique. Unstable keys such as produced by Math.random() will cause performance degradation and loss of state in child components.



