# Episode 11: Data is New Oil

1. Higher order component is a function that takes a component and returns a component. It takes a component, enchances the features and returns a enhanced component. Suppose in Swiggy, in the list of restaurants we can see that some of the restaurant cards have 'PROMOTED' label on the component. So, we will use higher order component in building this kind of feature.
Example of higher order component would be 
```
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
      <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
        <RestaurantCard {...props} />
      </div>
    );
  };
};
absolute overalaps in the component.
```
Here withPromotedLabel is a higher order component that returns a component. Again component is a function that returns some JSX in it. This is a enhanced version of the Restaurant Card.
We can use some logic as below to display the higher order component
```
  {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
)}
```
We need to make sure that we pass the props from the higher order component to respective card.
Higher order components do not modify but they are to enhance the component. Higher order components are at the end of day functions.

2. UI is very static. It does not have logic of its own. All the react applications have two layers : UI layer and data layer. The UI layer is powered by data layer. UI layer consists of JSX. Data layer consists of state, props, code we write inside JSX curly braces. 

3. Accordion is UI element where we can expand or collapse the content inside the component. In Accordion, there are two kinds of data, accordion head and body.

4. If we want to built a feature where one accordion if expanded, all the other accordion are collapsed. It is difficult to build this type of feature because each component is handling their state. So, we want the state of these small components to be lifted up and we want to give power whether to collapse the components to the parent. In the code, we want to give power to RestaurantMenu instead of RestaurantCategory as it is now. Parent should tell whether to open or collapse such that parent control the children. Now, the child RestaurantCategory is a controlled component. If children were controlling the state, it would be uncontrolled components. But if the parent is controlling the children, it is controlled components because it is relying on parents what to do. Children should somehow modify state variable of parent but it is not possible directly but indirectly.

```
import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };
  return (
    <div>
      {/** Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;


import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(3);

  if (resInfo == null) return <Shimmer />;
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/** categoris accordioins */}
      {categories.map((category, index) => (
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card?.title}
          showItems={index == showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;

```
In the code above, setShowIndex is set from the children which shows that we are lifting the state up.


5. react dev tools is very useful tool. We will get components and profiler. We can get component hierarchy in components that is essential for debugging. We can say that representation is the virtual DOM. Left side shows the components and right side shows the data layer. Profiler records our application. Whatever we try to do, everything gets recorded in profiler. It shows our actions and shows time for rendeer and everything. We can find out which our component takes long time to render and monitor our large scale application.

6. Props drilling: We have a lot of nested components. Passing components from one component to another is challenge. React has one way data flow. Data is passed from parent to children and passes in one direction. Suppose if we want to pass the data from top parent to the leaf, we cannot pass data directly to leaf nodes. We have to pass the data through intermediate nodes/parents. But in this case, if there are more level of nesting and passing props to each descendant is a troublesome. So, this process is called props drilling. We need to avoid props drilling. We need to have some kind of global data that can be accessed anywhere. React gives access to React Context. It is like a global place where everyone can access the context. For example, logged use information can be needed in anywhere in the application. Another example could be theme. 

Context solves the problem of props drilling. There are many ways but context is one way to have a centralized store.

7. Context is a global thing so instead of components, we can keep it inside utilities. React gives access to createContext that comes from React library. It is like central object. We can access the context information using React hook named useContext hook. In our project, we can have as many context as needed.

```
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);

....

   <li className="px-4 font-bold">{loggedInUser}</li>


}
```
It does not make sense to use context instead of all the props. We can use context if the data is required in many places. In class based components, we donot have hooks so we cannot use it. But how do we access the context data? We can use something as 
```
         <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="text-xl font-bold">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>

    It should have a call back function that gets data inside it.
```

8. How do we modify the context code? How do we pass updated value to the context default value. We have context Provider.

```
const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Utkrista K C",
    };
    setUserName(data.name);
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};
```

In this way, we can pass the updated value of the context such that the components that are using it can access.  If we wrap only the selected components with UserContext.Provider, then the updated context value is available only to that component. Rest all other components use the same old default value.

```
  return (
   
      <div className="app">
       <UserContext.Provider value={{ loggedInUser: userName }}>
        <Header />
        </UserContext.Provider>
        <Outlet />
      </div>
    
  );
```

Can we write nested UserContext.Provider ? Yes 
```
  return (
    <UserContext.Provider value={{ loggedInUser: userName }}>
      <div className="app">
      <UserContext.Provider value={{ loggedInUser: "changed" }}>
        <Header />
        </UserContext.Provider>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};
```

Only the inner nested components where there are changes, changed value will be used.

9. We can also change the state of the context using set methods. Suppose, we want to change the state such that when we type something in the input box, it gets updated.

```

const AppLayout = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Utkrista K C",
    };
    setUserName(data.name);
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};
```
Here we have passed setMethod in UserContext.Provider.
```
const { loggedInUser, setUserName } = useContext(UserContext);
 <div className="search m-4 p-4 flex items-center">
          <label>UserName:</label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
</div>

```
This data is changed everywhere it is used.

Redux is external library so medium or small scale applications do not need redux and we can use context. We can also use large application using Context but Redux is scalable for large applications. A lot of people prefer redux.

# Theory Assignment

Chapter 11 - Data is the new oil

1. What is prop drilling?
Props are data that we can pass or access from top level components to any number of child components in our application.
Props drilling also known as threading is a concept that you pass data from parent to child but with many intermediate 
child who own the props just to pass down the chain. Props drilling is a situation where data is passed from one component 
through many interdependent components until you get to the component where data is needed. Passing data through multiple 
components is not a good way of writing clean and reusable code. React Context API is fast way to avoid props drilling and 
ensuring that data is managed globally.

2. What is lifting the state up?
In React sharing state is achieve by moving it to the closest common ancestor of the components that need it. This is called 
lifting state up. There should be single source of truth for any data that changes in React application.

3. What is Context Provider and Context Consumer?

Context provides a way to pass data through the component tree instead of manually passing props at every level. There might be situations that some data is needed by many components in the application. In that case, context provides a way to share data between components without explicitly having to pass a prop through every component. Context is used to share data that is considered global for a tree of React components such as theme, authenticated user, language preference. One another alternative if you want to avoid using Context, component composition can be simpler solution. It might be called as inversion of control as it makes our code cleaner by reducing amount of props. But it is not the right choice. It adds more complexity.
```
React.createContext: 
const MyContext = React.createContext(defaultValue);
```
It creates a context object. When react renders component that subscribes to this context object, it will read current context 
value from its closest matching Provider above it in the tree. The default value is used only when the component doesnot 
have matching Provider above it in the tree. This default value can be helpful for testing components in the isolation without 
wrapping them. Passing undefined as a provider value doesnot cause consuming components to use default value.


Context.Provider: 
```<MyContext.Provider value = {/*some value */} >```
Every context object comes with a react provider component that allows consuming components to subscribe to context changes.
It accepts a value prop to pass it to descendant consumers. One provider can be connected to many consumers. Providers can be 
nested to write value deeper within the tree. All the consumers that are descendants of provider will re-render if the 
value prop changes. Changes are determined using same algorithm.

Class.ContextType: 
 The contextType property can be used with class to assign a context object created by React.createContext(). Using this, 
we can consume the nearest value of context type using this.context. We can access this.context in lifecycle methods including 
render function.
```
MyClass.contextType = MyContext;

If we are using public class field syntax, we can use static contextType and use it.
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}


Context.Consumer: 
<MyContext.Consumer>
{value => /* render based on value */}
</MyContext.Consumer>
```
It is React component that subscribes to context changes. It requires a function as a child. This function receives current 
context value. The value will be equal to closest value prop passed in Provider. If there exist no such Provider, default 
value that was used in creating Context will be used.

 Context.displayName: 
Context object accepts displayName string property. React Dev Tools uses this string to determine what to display name for context.
```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
```


Caveats: 
Context uses referential identiy to determine when to re-render so there can be unintentional re-render in consumer's when 
provider's parent re-renders.

```
In JS, identity operator returns true if operands are equal else false without type conversion.
//identity or strict equality 
x==y
```

Identity describes the property of objects that distinguishes from other objects. Reference identity is to use object reference 
as identity. The refernce points to object's location in memory. Reference identity is memory address equality i.e. two variables point to same content or not. So, identity reference refers to a reference that points to same object in memory. The equality operator '==' compares the value of two variables, whereash the identity operator '===' compares both values and type of variables. If the two variables have same value and type, they are considered identical and refer to same object in memory.
In JS, when we compare non-primitive values such as literal, objects, arrays, functions and so on, 

```
const a = {}
const b = {}
console.log(a === b)
```

It will return false because equality checks on non-primitive values check identities and not the contents of those objects.

```
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}

To get around this, lift the value into the parent’s state:

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}

```


4. If you don't pass a value to the provider does it take the default value?
No, we get error if we donot pass value with provider. If we donot pass anything, the argument will be undefined and 
default value will not be used.


# Additional

* Class component donot have hook. So in class components, so we use context imported as a component. We can do 
```<ContextName.Consumer>```- It will take a jsx that will have function having value of context.

* We can also modify context data from where we want to modify data such as API call using ```<ContextName.Provider value={}>``` In ourUserContext.Provider we can override default value of context. We can also modify context for smaller portion of application.

* We can also give names to context by providing contextname.displayName = "".

* Context is powerful,it even updates values of components that are even loaded. It is because of the Data layer. It is not tied 
component. 

* createContext at the end of the day is a function. It takes in some data that you need across all application.
We can use createContext to create the context and useContext to use that. useContext at the end of the day is a hook.
Yes, we can have multiple contexts in our application. It is like a constant file and we can use it anywhere. It is not tied to component. But state variables(useState()) are tied to component. State and props are tied to components. We use contexts as central store if data is needed all across our application. We 
donot create context for all.

* Suppose we want user logged in info, to any other children component or anywhere, we can use props drilling but that is bad 
approach. So, we have to store it in a central space so that every component can access it. One option can be local storage 
but local storage is not that reliable as it is inside browser. Also updating local storage is heavy or costly operation.
React gives access to this central space known as React Context. Some also use Redux store to handle this. It is like a shared state and any component can use that data all across the application. There are many libraries similar to React Context but React has made its own. We can even make a global variable but in that case react is not tracking the variable and no reconciliation happening.


