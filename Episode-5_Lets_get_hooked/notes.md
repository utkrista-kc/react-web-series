# Episode 05 - Let's get Hooked

1. Everything you have done can be done using normal HTML, CSS, Javascript. The beauty of library is it makes us write large scale applications with less code and highly performant applications.

2. Best practise is to make separate files for separate components. All the main code, we keep main code in src folder.

3. React does not have opinions on how you put files into folders. Avoid too much nesting.

4. We can name our file as .js or .jsx or for typescript .tsx.

5. Component should be exported before imported. ```export default Header```. Even if we do not put extension in import, we can write as ``` import Header from "./components/Header"; ```

6. Never keep hardcoded data in components folder. Keep it in a separate folder such as utils or common. Components start with capital letter.

7. One way to export is using default export (export default compName). If we have to export multiple components, we use named export. We can write export in front of variable (export const Logo_URL). When we import a named export, we import in this manner ``` import { CDN_URL } from "../utils/constants";```. Default export is imported in this way ```import resList from "../utils/mockData";``` A good practise is to keep default export for components.

8. A better practise is to keep components code no more than 100 lines. 

9. 
```
  <button
          className="filter-btn"
          onClick={() => {
            console.log("Button Clicked");
          }}
        >
          Top Rated Restaurants
        </button>
```
In this code, onClick is passed with callback function which is JS, so it is wrapped in curly braces. 

10. We have normal JS variable. We can give superpower to the variables known as state variables. For this, we will use React hooks (useState). Functional component is a normal JS utility function at the end. React element is plain JS object. A react hook is normal JS function. It is pre-built and it has some functions written on it. There are two important hooks (useState and useEffect).
useState() - superpowerful state variables in React, imported as named import from React, maintains state of a component
useEffect() 
```
  // Local state variable - super powerful variable
  const [listofRestaurants, setListOfRestaurant] = useState([]); // default value passed
  // array is returned above so we do it.
  // Normal JS variable
  let listofRestaurants = [];
```
We can modify state variable with set function given as setListOfRestaurant above. We cannot directly modify. useState([])- we can supply a default value. When normal variable updates, UI does not update. When the state variable is updated, the UI is rendered. useState Hook returns an array. Array has first item variable name and set function(set the value of variable);

11. Whenever a state variable updates, React re-renders the component. React will keep sync with the data layer. As soon as the state variable update, React re-renders the component. React makes DOM operations superfast and efficient.

12. React uses reconciliation algorithm. It is also known as React Fiber (came up in React 16). Actual DOM has HTML tags. Virtual DOM is representation of actual DOM. Virtual DOM is react elements. React creates an object out of React JSX. React virtual DOM is React object. Diff algorithm finds difference between old Virtual DOM and new virtual DOM. The difference is calculated and update to the actual DOM is done. React Fiber is new way of updating the DOM. Finding out difference between two objects is fast. Virtual DOM is kind of object representation of DOM. React is doing efficient DOM manipulation. Virtual DOM is not new, it existed before too but React took that concept and performed the implementation. This is why React is popular.

13. 
```
Array destructuring: 
const arr = useState(resList); // default value passed
const [listofRestaurants, setListOfRestaurants] = arr;
```

# Theory Assignment: 

1. What is difference between named export, default export and * as export?

ES6 provides two ways to export a module from a file.
- named export: We can have multiple named exports per file. We import named exports by sorrounding them in curly braces. The name of the imported module should be same as the name of exported module.

- default export: One can have only one default export per file. We can use any name while importing.

```*``` as export - With this we can import all the named exports into an object.

export * as ns from "mod"; => This re-exports all named exports from mod as named exports of currrent module, but the default 
export of mod is not re-exported. import * from "mod" doesnot exist.

2. What is importance of config.js file
In React, UI components are separated and they are building blocks of whole application. In some cases, developer might want to 
store or manage a global static variable  shared across all components. Ideally, this variable would be constant that store data 
such as app url, server url, colors, etc. One can use JSON, .env or webpacks or other options to store config file. Since, React
work in browser and anyone can inspect source of your app and see all data. So, we need to make sure we donot store sensitive data such as private or secret APIs in client side config files.

3. What are React Hooks?
Hooks are new addition in React 16.8. They let you use state and other features without writing a class. React doesnot offer 
a way to attach reusable behaviour to component. With hooks, we can extract stateful logic from component so it can be tested 
independently and resued. Hooks allow us to reuse stateful logic without changing component hierarchy. Hooks let you split
one component into smaller functions based on what pieces are related. Hooks are functions that lets you hook into React state and lifecycle features from function components. Hooks donot work inside classes they let us use React without classes. React provides built in hooks like useState.React provides a bunch of standard in-built hooks like useState(), useEffect(), usecontext(), useReducer(), useCallback, useMemo(), useRef(), useLayoutEffect(), useDebugValue() and other additional hooks.

3. Why do we need a useState Hook?
useState returns a pair of values: the current state value and function that lets you update it. If one writes a function component and we realize that we need to add some state to it, previously, one had to convert it to class. Now, we can use hook inside existing function component. One can manipulate DOM with useState. useState hook allows to track state in a function component.State refers to data or properties that needs to be tracked in application. Suppose we built a counter without useState in React then, once the counter is displayed, it will not get re-rendered if we increment or decrement the counter as React does not get that there is change in state. So, if hooks are used, we can get display the changes on the screen.


# Additional 

* What is event.target
event.target returns a DOM elements that triggered a specific event, so we can retrieve any property or attribute with value.
We can access value of an element with event.target.value. In react events are synthetic events, a wrapper aronund browsers native event. It has same interface as browser's native event except it works identically across all browsers.

* Does event belong to the Event Web API?
No, it is SynthenticEvent that is a wrapper around the native event.

* Is it more of a React thing?
Yes, it has the same interface as the browser's native event but has little different attributes.

* How do I access the browser's native Event in a React code?
In most cases, you don't need to. But you can use nativeEvent property of SynthenticEvent i.e. event.nativeEvent.

* The destructuring assignment syntax is JS expression that lets us unpack values from arrays, properties from objects into distinct variables.
```
[a, b, ...rest] = [10, 20, 30, 40, 50];
({ a: a1, b: b1, ...rest } = obj);
```

* Why do we need state variables?
Whenever a variable changes, something changed variable but React would not know that it needs to update DOM and change it into UI.React has no idea what is happening to your variables. So, to update variables in sync with UI, we need to use state variables. Change is re-rendered when changes encountered.

* If we need a variable that changes its state, we need to maintain a variable that is React kind of variable. Every compoonent
in React maintains a state so we can put all variables into state. So, we will create variables using useState Hook.
Hooks is just normal function. We get useState from react. Hooks create local state variables.


* Read about synthetic events.

Handling events in React elements is similar to handling events in DOM. However, there are some syntactic differences
One is camelCase and event handlers are not strings they are passed as functions. Also, we cannot directly return false to 
prevent default behaviour. We have explicitly calll preventDefault.
```
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

e is synthetic event. They are cross-browser compatible and they donot work exactly as native events.
Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.
```
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

Event handlers in react will be passed instances of synthetic event which is a cross-browser wrapper around brower's native event.It has same interface as browser's native event. Synthetic events are different and donot map directly to browser native events. It provides unified API, prevents browser inconsistencies and ensures event works same in all platforms.

* React one way data binding
Two way data binding allows to take value of property and display on the view while also having input to automatically update value in model. Like, if user updates value of textbox, the view will automatically update and value of this parameter also gets updated in controller. In one way binding, the value of the model gets bind to view but doesnot have additional watcher to find if the value in the view is changed by user.

React doesnot have mechanism to allow HTML to change component. HTML can only be allowed to raise events that component responds to.If there is some input in ```<input>``` tag then, it doesnot have direct access to component state so it cannot make changes directly whatever is typed on screen. This is one way binding. It allows data to be flown in one direction i.e. parent to child. If data is modified in parent, it is reflected in child but changed data of child is not reflected, we have to notify parent about change of value in child. 

HTML form elements such as ```<input>. <select> and <textarea>``` typically maintain their own state and update it based on user input. In React, mutable or changeable state is only kept in state property of components. Input form element is controlled by React, so we called controlled compoents.

* Read React File Structure
React doesnot have opinions on how one structures files into folders. However there exist some common practices:
- Grouping by features or routes. E.g.: common, feed, profile etc
- Grouping by file type: E.g.: Components, api, etc

Better to avoid too many deep directory nesting. It is often good idea to keep files that change together close to each other.
This principle is called colocation.

