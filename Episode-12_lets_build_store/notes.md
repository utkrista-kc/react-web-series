Episode 12: Lets build our Store

1. Redux is not mandatory in applications. When we are building small sized or medium size application, redux is not mandatory and we need to use when it is required. Also, redux is not only library. There is another library zustand that is like react. 

2. Redux and react are two separate libraries. Redux is not from the react.

3. Redux is used for handling state of our application. It becomes easier to debug with redux. It is a predictable state container for JS applications. Redux can be used with other frameworks or libraries but it is famous with react. Redux toolkit is new way of writing redux. We will be using it with react-redux instead of vanilla redux that is old way of writing redux. Redux Toolkit is the standard way to write redux logic. Redux toolkit was created to help address the common concerns about Redux ( configuring redux was complicated, we had to add a lot of packages to get redux to do anything useful, redux used to require too much boilerplate code)

4. Redux store is a big JS object and kept in a global central place and any component can access from it. We keep major data of our application to this store. It is absolutely fine to store all the data into the redux store. But as the size of the redux store grows, we have something as slices that is a small portion of the redux store. The slices are the logical separations of the data. For example for cart data, we can create cart slice, for logged in use, we can create user slice and there can be many slices. Initially, the slice can be empty but as we modify the data will be added. Suppose for cart slice, it is initially empty. In order to update the cart slice in redux store when we press button add to cart we need to dispatch an action. The dispatch an action will call a function and that function will modify the cart information as we cannot directly modify the cart information. The function that gets called when dispatching an action, it is called reducer and it can internally modify the state of the store. When add to cart button is clicked, it dispatches an action that calls a reducer and finally cart slice in redux store is modified. In order to read data, we use selector. Selector reads data from redux store and it help us modify our redux component. This phenomenon is called subscribing to the store (it is in sync with the store).

```
ADD button (click) -> A (dispatch action) -> fn(reducer) -> slice (redux store)

cart component - subscribed to the store using selector.
```
5. 
Redux toolkit 
    - Install @reduxjs/toolkit and react-redux
    - Build our store
    - Connect our store to our application
    - Slice (cartSlice)
    - dispatch(action)
    - Selector

Suppose we initialized our store as 
```
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({});

export default appStore;

```
In order to provide the store to our application, first of all, we import Provider from react-redux. 
```import { Provider } from "react-redux";``` We need to provide store as a prop. Then, we can wrap our app with the store as follows: 

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
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
```
If redux is not required in other components, we can also provide redux store to portion of the application.

6. 
```
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItems: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0; // []
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

```
In this code, we have created a slice where we pass name, initial state and reducers. The reduces modify the state of redux store. We export actions and reducers in the format given above. It is because, the cartSlice is some big object that has actions and reducer as 
```
{
    actions: {
        addItem
    }, reducer
}
```
initialState is object, reducer is also an object that has functions.
We wrote ```  state.items.length = 0; // []``` instead of state = []. It is because it will not work. The reason state.items.length = 0; works in the clearCart reducer, but directly assigning state = []; does not, is related to how Redux's toolkit (and generally, Immer, which is used under the hood) handles state mutations. Redux Toolkit uses Immer to enable "mutating" the state in a way that appears to be mutable but is actually handled immutably. When you directly assign a new array to state.items, you're breaking the immutability rules because you are replacing the entire array reference. On the other hand, state.items.length = 0; is a valid way to mutate the array in place without breaking the immutability rules. This operation changes the length of the existing array, keeping the same array reference intact. Immer is smart enough to recognize this as a valid mutation and will produce a new state object with the updated array.

```
const originalState = {
  items: [1, 2, 3],
};

const mutatedState = produce(originalState, (draftState) => {
  // This is a valid mutation
  draftState.items.length = 0;

  // This would be invalid because it replaces the array reference
  // draftState = [];
});

console.log(mutatedState.items); // Output: []

In the produce function (used by Immer), directly assigning a new array to draftState.items would throw an error because it violates immutability rules, but modifying the existing array (e.g., changing its length) is allowed.
So, in your Redux Toolkit code, state.items.length = 0; is the correct and intended way to clear the array within the constraints of Immer and Redux's immutability requirements.
```

```
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;

```
As we have reducer for small slices, When we import the reducer, we pass in the reducer key as it represents combination of all the small reducers. We add all reducers all of them.

```
  addItem: (state, action) => {
      state.items.push(action.payload);
    },
We are mutating the state over here that is we are directly modifying the state.
```
7. Selector is nothing but a hook inside react.
```
import { useSelector } from "react-redux";
  // Subscribing to the store using the selector.
const cartItems = useSelector((store) => store.cart.items);
 We specify the portion of the store that we want to subscribe to.
```

8. For dispatching, we use useDispatch() hook from react-redux.
```
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

  const handleAddItem = () => {
    // Dispatch an action
    dispatch(addItem("cart"));
  };

<button className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg" onClick={handleAddItem}> Add + </button>
```
This addItem function behind the scene will create a object that will have payload as key. 
```
payload: "pizza"
This is the reason we are accessing action.payload in addItem reducer.
```
Behind the scenes, redux is doing a lot of things.
When passing a parameter to handleAddItem, never do this
```
<button className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg" onClick={handleAddItem(item)}> Add + </button>
```
Instead do this: 
```
<button className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg" onClick={() => handleAddItem(item)}> Add + </button>
```
```
onClick={handleAddItem(item) : This means to call a function right away. In this case, you are calling the handleAddItem function immediately when the component renders, not when the button is clicked. This is because the parentheses () execute the function immediately, and the result of the function call (presumably undefined in this case) is assigned to the onClick event.
This is incorrect for an event handler. Instead, you should use a callback function to pass a reference to the function. Avoid using onClick={handleAddItem(item)} as it will execute the function immediately when the component renders.

onClick={() => handleAddItem(item): This means to pass a callback function. This syntax uses an arrow function as a callback. It correctly creates a new function that calls handleAddItem with the item argument when the button is clicked.
This is a common pattern when you need to pass additional arguments to the event handler. Use onClick={() => handleAddItem(item)} when you need to pass arguments to the event handler. () => { ... }: This is an arrow function syntax. It's a concise way of defining a function. In this case, it's an anonymous function with no parameters.

onClick={handleAddItem}: In this case, you are passing a reference to the handleAddItem function without calling it immediately. The function will be called when the button is clicked. This is appropriate when you don't need to pass additional arguments to the event handler. 
```
9. Important Interview Question: Whenever we are using selector, make sure you are subscribing to right portion of the store. If not it will lead to huge performance loss. Even if we subscribe to whole store, it works fine but this process is not efficient. If anything changes in whole store, this component will know that there are some changes. So, when the application grows huge, we donot want the component be affected by random changes in the store. 

10. In the main appStore, it has single reducer for whole application so we write 'reducer'. But in case of cartSlice, there are multiple reducers so we write reducers. When we export, we are exporting one reducer from cartSlice but it is combination of multiple reducers.

11. In vanilla redux, we used to get warning that "donot mutate state". Suppose state.items.push(action.payload) - this was also prohibited. Basically, we used to create a new state and then modify the new state and return the new state.

```
const newState = [...state];
newState.items.push(action.payload);
return newState;
```
So, in new version, we have to mutate the state. Earlier, returning is mandatory but now returning is not mandatory.
But if we are mutating the state over here, redux is handling the mutating behind the scene. It is actually doing similar approach behind the scene. Redux uses Immer library. Immer is a package that allows you to work with immutable state in a more convenient way. In the addItem case, you're modifying the array (push) in place, which is a supported form of mutation with Immer. Immer recognizes this mutation and correctly produces a new state with the updated array.

```
clearCart: (state, action) => {
    state=["akshay]
    // Here we are not mutating the state but adding the reference to it.
}
```
state is a local variable and it will not modify the original state. Redux also has current function, that when we use current(state), we can view the current state value.
We can do state.items.length = 0 or return {items: []}. 
Reduxtoolkit says either mutate the existing state or return a new state.

12. Install redux dev tool extension. Redux is used in large scale applications. If components are subscribed to large number of components, debugging is very tough and this extension helps in debugging. It gives log of everything that we have done so far. It shows line of code where we have dispatched the action. We can simulate the behabiour and we can jump between states. We can simulate the behaviour of the user here. In older versions, we used to use middlewares such as redux thunks. With redux tooklit we can use RTK query. Read RTK Query.

# Theory Assignment

1. useContext vs Redux.
- useContext is a React hook that allows functional components to consume values from a React context. It's suitable for simpler state management within a component tree.
- Redux is a state management library for larger applications, providing a global store and a predictable state container. It's more suitable for complex state management, especially in large-scale applications where state needs to be shared across components.
2. Advantage of using Redux Toolkit over Redux.
- Simplified Syntax: Redux Toolkit simplifies the syntax for creating actions, reducers, and the store setup, making the code more concise.
- Immutability Handled Automatically: Immer is integrated into Redux Toolkit, allowing developers to write "mutating" logic that is automatically converted into immutable updates.
- Built-in DevTools Configuration: Redux Toolkit comes pre-configured with the Redux DevTools Extension, making it easier to debug and trace actions.
- CreateSlice Function: Redux Toolkit introduces the createSlice function, which further simplifies the process of defining reducers and actions.
3. Explain Dispatcher.
In the context of Redux, a dispatcher is a function provided by the Redux store that allows you to dispatch actions to update the state. It is used to trigger changes in the application state by sending actions to the reducers.
4. Explain Reducer.
A reducer in Redux is a pure function that takes the current state and an action as arguments and returns a new state. It describes how an action transforms the state into the next state. Reducers are combined to form the overall application state.
5. Explain slice.
In Redux Toolkit, a slice is a set of reducer logic and actions for a specific feature or part of the application state. It includes a reducer function and action creators, allowing for more modular and maintainable code.
6. Explain selector.
In the context of Redux and Reselect, a selector is a function that computes a derived data from the Redux state. Selectors are used to efficiently extract and transform data from the state and are often employed to avoid unnecessary recomputations.
7. Explain createSlice and the configuration it takes.
createSlice is a function provided by Redux Toolkit to define a slice of the Redux state. It takes an object with the following configuration options:
- name (string): The name of the slice.
- initialState (any): The initial state value.
- reducers (object): A set of reducer functions, where keys are action type strings and values are functions that update the state.
- extraReducers (object): Optional. Additional reducers that listen to actions outside the slice.
- immer (boolean): Optional. Enables Immer for writing "mutating" logic.

```
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

```

# Additional

- To create a slice, we use createSlice that is imported from reduxjs/toolkit. It is because creating slices is the core job of 
redux. createSlice contain name, initialState(initial default values) and reducers that will have mapping of action and reducer function.
Reducer function takes state and action. State is initial state and action is data which is coming in i.e. payload. State will hold the 
current value and we will modify that state. We can have more actions and reducers.reducer function doesnot return. It takes and direclty 
updates. We will export action and reducer from the slice using 
```export default sliceName.reducer and export const {actionNames} = sliceName.actions;```
Reducers are exported by default, actions are exported by names.
