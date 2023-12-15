Episode 08 - Let's get classy

1. In order to create a class based component, we have to write component name with class and then extend using React.Component. 
```class UserClass extends React.Component {}```
Functional components are functions that returns a piece of JSX. Class based components are functions that consists of render method and returns some piece of JSX. 
React.Component is some class given by React and UserClass is inheriting this class. 
```
import React from "react"; 
class UserClass extends React.Component {
  render() {
    return (
      <div className="user-card">
        <h2>Name: Utkrista</h2>
        <h3>Location: Sydney</h3>
        <h4>Contact: @utkrista</h4>
      </div>
    );
  }
}
export default UserClass;
```

2. In order to pass props to the class based component, we will have a constructor in component and that constructor will receive props.
```
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
   render() {
    const { name, location } = this.props;
    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @utkrista</h4>
      </div>
    );
  }
}
```
props can be accessed using this.props.propsname.

3. Hooks is new way of creating state. So, in class based, it is done differently. When we loading a class based component, it means we are creating an instance of the class. So, when instance of class is created, constructor is called. So, it is best place to receive props and best place to create state variables.
State variables was created using this.state and this variable is big object.

In functional component, in order to create two state variables we write as 
```
  const [count] = useState(0);
  const [count2] = useState(1);
```

But in case of class based components, we keep everything in this.state object as 
```
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      count: 0,
      count2: 1,
    };
  }
```
In case of functional components, behind the scene React is also making the big object out of those multiple useState statements.

4. Updating state variables in class based components: 
```
 <button onClick={() => { this.state.count = this.state.count + 1; }}></button>
```
We never update the state variables directly (NEVER!!!!). 
NEVER UPDATE STATE VARIABLES DIRECTLY. It will not get updated.
React gives a function this.setState in order to update the state variables. When state variable is changed, React re-render the component. 
```
    <button onClick={() => { this.setState({ count: this.state.count + 1, });}} >

    If we have to update multiple variables together, we can batch them up.
     <button onClick={() => { this.setState({ count: this.state.count + 1, count2: this.state.count2 + 1 });}} >

```
When we have sent multiple values in this.setState, only those values will be updated and if we donot set variables then their values will not be updated. Only the portion of the variables is updated. We will be calling component loading as component mounting.

5. Suppose About is parent component and UserClass is inside the About component. When we load or render About component, when the line which mentions UserClass, it starts loading the UserClass component. Then new instance of UserClass is created and constructor is called. Once the constructor is called then render() method is called. 
We can also destructure Component as follows:

```
import { Component } from "react";
class About extends Component {
}
```
If we keep console.log statements in About and UserClass inside constructor and render methods. We get this order of printing
Parent Constructor - Parent Render - Child Constructor - Child Render

```
class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");
  }
  render() {
    console.log("Parent render");
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is Namaste React Web series</h2>
        {/* <User name={"Utkrista (function)"} location={"Sydney"} /> */}
        <UserClass name={"Utkrista (class)"} location={"Sydney"} />
      </div>
    );
  }
}
```

6. Class based components have method componentDidMount(). When first constructor and render method are called, then componentDidMount method is called. Now, the console statements that got printed in UserClass component are 
Parent constructor - Parent render - Child constructor - Child render - Child Component Did Mount

Suppose if we have componentDidMount in parent component About, the order of print statements would be: 
Parent constructor - Parent render - Child constructor - Child render - Child Component Did Mount - Parent Component Did Mount
It is because when parent render method is getting executed, we encounter UserClass as child component. So, when it starts to render the child component or child lifecycle methods are triggerred, the parent's render method is still in execution. So, the parent compoent Did Mount executed at the end.
Once the component has been completely mounted, then componentDidMount gets executed.

Use case of componentDidMount: Some things that we do once the component has been mounted. Suppose making an API call. We do this because React need not wait for the API call response to load the page. Everything gets loaded and the UI is updated with API response. Doing this, improves the user experience. If we wait for the data, React will wait for rendering.

Suppose, we have two child components inside parent class. 

```

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");
  }

  componentDidMount() {
    console.log("Parent Component Did Mount");
  }
  render() {
    console.log("Parent render");
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is Namaste React Web series</h2>
        <UserClass name={"Utkrista (class)"} location={"Sydney"} />
        <UserClass name={"Elonk musk"} location={"US"} />
      </div>
    );
  }
}
```
The order of console statements are as follows: 
- Parent constructor 
- Parent render
    - First Child Constructor
    - First Child Render
    - Second Child Constructor
    - Second Child Render
    ```<DOM UPDATE - IN SINGLE BATCH>```
    - First child commponentDidMount
    - Second child componentDidMount
- Parent componentDidMount

To understand this process go tho this link for React lifecycle methods: 
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

When component is mounted in React, it works in two phases. One is render phase and other is commit phase. constructor and render methods are in the render phase. Then, React updates DOM and then componentDidMount is called. Render phase is pure and has no side effects. It may be paused, aborted or restarted by React. In the commit phase, it can work with DOM, run side effects and schedule updates.
The Mounting phase happens for every child, every component in react.

First of all About will be mounted. Then parent constructor is printed. Then parent render will happen. Then it goes to first child, then prints the constructor and render of first child. Because there are two children, React optimizes this part. It will not call componentDidMount for first child. Instead, it will batch the render phases of two children. And then commit phase will happen together for both children. Thus, the output will be in the above mentioned order. React is batching render for multiple children. Because in commit phase, DOM is updated which is expensive operation. So, in the render phase, everything is happening in the virutal DOM. Since render phase is very fast because it is only using diffing algorithm in render phase. So, the React batches children in render and commit phase.

7. In class based components, in order to make API call, we can make componentDidMount function async.
```
 async componentDidMount() {
    // console.log(this.props.name + "Child Component Did Mount");
    const data = await fetch("https://api.github.com/users/utkrista-kc");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
    console.log(json);
  }

```
Initially, when the component loads, constructor is called and then render() function is called. Initially, the component gets rendered with default value. React will update DOM with the dummy data.
We can test using the debugger in the code as 
```
  render() {
    // console.log(this.props.name + "Child render");
    const { name, location, avatar_url } = this.state.userInfo;
    debugger;
  }
```
Then componentDidMount was called and then api call was made. The set state happened in componentDidMount. The mounting cycle happened when the component loaded with dummy data in the render phase such that user sees something. When we do setState, the update happens. The state variable is updated, react triggers render once again. The render happens but the state variable has been updated. React will update DOM with the new value. The update cycle says that it will update componentDidUpdate.

8. 
```
/**
 * MOUNTING CYCLE ---------------
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy>
 * ComponentDidMount
 *      <API Call>
 *      <this.setState> - state variable updated, triggers the reconciliation
 *
 * UPDATE CYCLE --------
 * Render (API data)  - render updated with new data
 *      <HTML> new API data
 * componentDidUpdate
 *
 */

```
componentDidUpdate gets called in the update cycle.
First of all mounting cycle happens then the update cycle happens.

9. componentWillUnmount() - It is called just before component is unmounting. When this component disappear from the UI or HTML.

10. Never compare React lifecycle methods to functional components. 

11. After first render componentDidMount is called. After subsequent render, componentDidUpdate() is used. In functional components, when we pass a dependency array with some value, useEffect will get called if there are some changes in that value provided in dependency array. We can do similar in class based component.
```
  componentDidUpdate(prevProps, prevState) {
    if (this.state.count != prevState.count ||
    this.state.count2 != prevState.count
    ) {
      // code.
    }
    console.log("component did update");
  }
```

In functional component, if we have to do something on change of one value and do something on change of other value, we use multiple useEffect hooks.
```
useEffect(() => {

}, [count]);

useEffect(() => {

}, [count2]);
```
Similarly in class based components, we use multiple if esle statements.

12. What will we do during componentWillUnmount(). We do the cleanup. When we leave the page, this function is called. There are lots of things that we need to clear when leaving the page. Suppose if we have setInterval in componentDidMount() after every second.
```
   componentDidMount() {
    setInterval(() => {
      console.log("Namaste React OP");
    }, 1000);
  }
```
Even if we leave the current page and move to other pages, this does not stop. If we go to same page again, the interval increment by 2seconds as earlier it was 1 second. Similarly it increased to thrice, 4th and so on. This is the disadvantage of single page application. This setInterval will be hanging on our website and we are doing the performance loss as it hampers our application. So, we need to take care of all the lines we write. Similar cases happen for setTimeout and other functions.

```
  async componentDidMount() {
    this.timer = setInterval(() => {
      console.log("Namaste React OP");
    }, 1000);
  }

    componentWillUnmount() {
    clearInterval(this.timer);
    console.log("componentWillUnmount");
  }
```

What will happen if we place  same setInterval in useEffect in functional component? If we navigate pages to page where setInterval is not present, the timer will not stop as we are not cleaning the things over there. We have a return function in useEffect. This function is called when we are unmounting the component.

```
const User = ({ name, location }) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Namaste React OP");
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("useEffect Return");
    };
  });

  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h1>Count2 = {count2}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: {location}</h3>
      <h4>Contact: @utkrista</h4>
    </div>
  );
};
```

13. When React was created, there were large number of lifecycle methods.