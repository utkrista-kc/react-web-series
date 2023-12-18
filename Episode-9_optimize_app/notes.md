Episode - 09 : Optimizing our App

1. Single responsibility rule - each of the components should have single responsibility. Suppose RestaurantMenu should have responsibility of showing only restaurant menu. If we are doing multiple things in same component, we have to break down into multiple components. We have to maintain code in modular format such that our code become more testable. We can figure out from which module our error is from. Our code becomes more reusable, maintainable and testable. There are not hard and fast rules in single responsibility principle. 

2. Creating custom hook is not mandatory. But creating custom hooks makes the code more readable. In the RestaurantMenu component, we have fetched the data and also displayed the menu data. But it should just show the menu data. So, we create useRestaurantMenu() hook. Hooks are nothing but normal utility functions. So, creating helper functions is to create in utility folder. It is good approach to create separate files for each hook. We have to start name with small letter 'use'.
We created custom hook to fetch APi data as follows: 
```
import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  return resInfo;
};

export default useRestaurantMenu;

```
We have to take decisions as a developer to segment the logic into hooks and component.

3. Here we create a custom hook to check if the user internet connection is online or not. We can use window event listener. This can be also used in chat applications. Along with this, we can also import in components and display message to user whether they are online or offline.
```
import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  // check if online
  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });

    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });
  }, []);

  // boolean value
  return onlineStatus;
};

export default useOnlineStatus;

```

4. We can simulate, no internet or other internet from our browser in network tab. It is not mandatory to use 'use' letter, it will work but a lot of projects use linter and they throw error. But it is good practise to use 'use' before creating custom hooks. In industry, linters are tools and if we do not write use in front of hooks, they throw error.

5. If we build large scale applications, it has large number of components. Parcel bundler minifies and creates single JS file. All the code is minified in a single JS file. So, if we make single JS file of larger application having thousands of component, the size of single JS file will be large. JS file will be huge and it will take larger time to load. So, we have to break down our application into chunks. We have to make smaller bundlers of the file and this process is called chunking or code-splitting or dynamic bundling or lazy loading.

We have to logical splitting of the code. The bundling should have enough code for a feature. We split our bundles into logical chunks. Suppose our application has food delivery and also have grocery delivery. Both of these features have large number of components. We will create different bundles for grocery and food delivery business. All the components should come from different bundle for grocery.
We do that using lazy loading. We donot load the component directly but we load that component using lazy loading. When our application loads, it will not load the code for grocery but when we go to that page only then that page loads. This process is also known as on-demand loading. We can do that using lazy() function that comes from react package as a named export.

```const Grocery = lazy(() => import("./components/Grocery"));```
lazy function takes a callback and it has import function. This import is different to import that we use to import components. This import function takes a path of the compoenent. Even if this is one line code, it has lot of power. Now, our main bundle is separate from the grocery bundle.

6. Error:  A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition. It is because React is very fast and it tried to load the Grocery component but the code was not there. It caused the error so we use supense() function for it. Supense is a component that comes from React and we can wrap our component using Suspense. We wrap suspense to component that is not available at the moment. Also, we need to pass Suspense with fallback that means what should be rendered when the code is not available. We can pass any JSX or also load with Shimmer component. We can check the code works using slow 3G on network tab.


# Theory Assignment 


1. When and why do we need lazy()?
Bundling is process of following imports and merging them to a single file. The bundle can be used to laod the entire app 
at once. Code splitting is feature supported by bundlers which allows us to lazy load only the things needed by user and eventually improving performance of application.
Best way to introduce code splitting is through dynamic import syntax.
```
Before: 

import { add } from './math';
console.log(add(16, 26));

After:
import("./math").then(math => {
    console.log(math.add(16,26));
})
```
When webpack comes, it automatically starts code splitting your application.

React.lazy is a function that lets us render a dynamic import as regular component.
```
Before: 
import OtherComponent from './OtherComponent';

After: 
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
This will load the bundle containing other component when this component is rendered.
React.lazy takes a function that calls a dynamic import. This must contain a promise which resolves to a module with 
default export containing React component. React.lazy currently supports default exports. If the module you want to import uses named export then we can create an intermediate module that reexports it as default value. lazy takes load as parameter. load is a function that returns a promise. But this will not be called until user attempt to render the returned component. After react calls load, it will wait for it to be resolved. Both the promise and resolved value will be cached so React will not call load more than once. If promise rejects, react will throw rejection reason to let the Error Boundary above it to handle. load receives no paramter.

lazy- lets you defer loading component's code until it is rendered for the first time. lazy returns a react component that we can render in the tree. While the code for lazy is being prepared, attempting to render it will suspend. So, we can display ```<Suspense>``` with loading indicator while it's loading. Donot declare lazy components inside other components.


2. What is suspense?
Suspense is not a data fetching implementation. It is a mechanism for data fetching libraries to tell react that the data a 
component is reading is not ready yet. React then can wait and update the UI later. The lazy component should be rendered inside Suspense component which allows us to show some fallback content while we wait for the lazy component to load. The fallback prop accepts any kind of React element. We can place suspense component on top of any React lazy component. We can also wrap multiple lazy components with single suspense component.```<Suspense>``` allow us to display a fallback until its children have finished loading. fallback is alternative UI that you intend to display instead of actual UI if it has not finished loading. Suspense will automatically switch to fallback when the children suspends and back to children when data is ready. If the fallback suspends while rendering, it will activate the closest parent Suspense boundary.

3. Why we got this error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition? How does suspense fix this error?
We got this error because, we dynamically loaded a component. When this process happens, when the component is getting being loaded, React tries to render the component giving this error. We can solve this by wrapping up with ```<Suspense>``` component which lets react know that the component is dynamically loaded and prevent it from suspension. Not just that, for the waiting time when the component is loaded, we can pass a falback props to suspense component which allows us to display a alternative UI until the dynamic component is loaded. 


4. Advantages and disadvantages of using this code splitting pattern?
Time to Interactive(TTI): It is a value that specifies the total time required for a website to aload all assets needed for a website to initialize and become interactive to user.

Advantages:
- While the total amount of code is same, the amount of code needed in initial render is reduced optmizing the performance.
- Offers physical separation of the different part of the application, being able to decide when the browser should load them.
- Drastic reduction of time to download data and parse to make app interactive i.e. reduction in TTI.
- Client side caching improved by updating only those parts of application that has changed.

Disadvantages:
- Code splitting requires downloading of data after the page initializes. If there is no internet connection, there is no way 
to load additional modules. We have to prepare some message to the user. We have to introduce loading indicators or develop 
some strategies for efficient loading.
- We need to write additional logic to load modules when required.
- Slight delay in loading the code chunk for the first time.
- We can only use it in client side rendering.


5. When do we and why do we need suspense?
Suspense is react component that is used to wrap up other components that might make asynchronous requests or any time the 
child component peforms some action in the loading state. In previous years of release, suspense was only used for code splitting with React.lazy and it was not supported rendering it in server. 

In React 18, support for Suspense on server and expansion in its capabilities using concurrent rendering features is done.
Suspense in React 18 works eest when combined with transition API. If you suspend during transition, React will prevent already 
visible content from being replaced by fallback. Instead, React will delay the render.

We need to use suspense for lazy loading components to prevent dynamic loading of components resulting into error when they are loaded for the first time.


# Additional 

1. Any component that is already rendered might suspend, so even those components have to go through fallback UI. In order 
to have consistent screen, if already shown component suspends, React has to hide its tree upto closest ```<Suspense>``` boundary.Suppose we are on photos tab and we try to move to comments tab. During this, instead of showing a loading screen, we want UI with loaded photo tab and update it when the comments are loaded. For this type of experience, we can use statTransition API. By this, we can tell React that it is not an urgent update but it is a transition that may take time.

Transitions are new concurrent features introduced in React. They allow us to mark updates as transitions and avoid going back 
to suspense fallbacks for already visible content. We can use startTransition and mark navigation state update as transition.

```
function Router() {
  const [page, setPage] = useState('/');

  function navigate(url) {
    startTransition(() => {
      setPage(url);      
    });
  }

```
This tells react that it is not an urgent update. It is better to show already revealed content. Transition doesnot wait for 
all content to load. It only waits long enough to avoid hiding already revealing conent. We can also use some indications to let 
the user know that transition is happening.

2. Error boundaries:
If module fails, we can handle such error to show nice user experience and manage recovery with Error Boundary. Once we have 
created Error Boundary we can use it anywhere above lazy component to display an error state when there is network error.

```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```
Error boundaries are react component that catch JS errors anywhere in the child component tree, log those errors and 
display a fallback UI instead of component tree that crashed. Error boundaries donot catch erros for: event handlers, asynchronous code, server side rendering and errors thrown in error boundary itself.

We cannot use try/catch because it works for imperative code whereas React components are declarative and specify what should be 
rendered. Error boundaries preserve declarative nature of React and behave as you would expect.

3. Route based code splitting 
Deciding where in the app to introduce code splitting might be tricky but a good place to start is with routes.

4. React.memo lets us skip re-rendering a component when its props are unchanged. This method only exists as a performance 
optimization.

5. Hooks are new addition in React 16.8. They let us write state and other features without using class. Using own hooks 
let us write component logic into reusable functions. Traditionally in React, there were two ways to share stateful logic :
render props(it is technique for sharing code between react components using a prop whose value is a function) and higher order components(is function that takes a component and return new component)
When we want to share logic between two JS functions, we extract it to third function. So, components and hooks are functions 
so it works for them too. A custom hook is a JS function whose name starts with "use" and may call other hooks.

- Do two components using same hook share state?
No, custom hooks are a mechanism to reuse stateful logic. But everytime you use it, all the state and effects inside it are completely isolated.


- How does custom hook get isolated state?
Each call to a hook gets an isolated state. We know that we can call useState and useEffect many times in one component and they will be completely independent. The same way works for custom hooks. We can pass information between hooks.
Using hooks to untangle a messy component and hid ecomplex logic in simple interface is recommended.
useReducer hook is an alternative to useState. useReducer is preferred when we have complex logic that involves multiple sub values or when the next state depends on previous one.

6. Never ever dynamically load component inside component. If done, it will be lazy loaded after every render cycle.
