Episode 6: Exploring the world

1. All the API, DB, UI, SMS etc are in the same whole project - monolith architecture. All team work on same github repository.
In microservice architecture, we have different services for backend, UI, authentication, SMS, database, etc. All these services combined forms a application. This is known as separation of concern or single responsibility principle. These services need to interact with each other. For example, our React project is UI microservice. We can have different techstack for different services. We do not need to restrict with particular language. We can deploy all these services in different ports and all these services can be mapped to domain name. All these services interact making calls to each other.

2. There are two ways when we fetch data in our application. 
- When the page loads, we can make call to API, wait for some ms for API to respond and then render the UI.
- Another approach, as soon our page loads, we render our page. Then we make call to API and as soon as data is received from API call, we will render the data from API. 
We will be always using the second approach in React and it is a better approach. It gives better user experience. We give some skeleton on the website and when data is received the page is loaded. It does not matter if we are rendering multiple times as React render cycles are fast.

3. useEffect comes from React library. It is imported as named import from React. useEffect is a JS function. It takes two arguments. First argument is arrow function (callback function) and dependency array. Callback function of useEffect will be called after the component renders. Suppose when component is rendered, when the render cycle finished then this callback function will be called. If we have to do something after component is rendered, we write in useEffect. If we have some console statements in component, then that console gets printed first before the useeffect. Now, we will fetch data in useEffect.

4. Error: Access to fetch at 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING' from origin 'http://localhost:1234' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled. 
We got this error because our browsers block the calls from one origin to another origin.
Allow CORS: Access-Control-Allow-Origin extension in chrome resolved our issue.
```
 const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    ); // Fetch returns a promise, we can use .then .catch or we can use async await

    const json = await data.json();
    console.log(json);
```

5. Better approach to use optional chaining. It is good way of handling data.

6. For better user experience, use shimmer UI. Shimmer UI resemebles the page's actual UI so users will understand how quickly the web or mobile app will load even before the content has shown up. We make a fake impression that something is running.

7. Rendering on the based of condition - conditional rendering

```
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }
```

8. In the code below, the variable btnName got updated but it was not reflected in the UI.
```
const Header = () => {
  let btnName = "Login";

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName = "Logout";
              console.log(btnName);
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};
```
The display had not a refresh. So, JS variables does not work in dynamic updates. Thus, we need state variables. There is no way for React to track whether btnName changed or not. As soon as update of state variables is called, the whole component is re-rendered. 

```
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              setBtnNameReact("Logout");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};
```

Here, const function is getting updated. Isn't it against principle of JS? No, this const variable is newly created again when the component is re-rendered again. It is not the same state variable created. This newly created state variable is created with updated value. Only the button is updated in the diff algorithm and this is reconciliation.

9. 
```
const [searchText, setSearchText] = useState("");
 <input type="text" className="search-box" value={searchText} />

 // Fix as follows
   <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
```
In this case, when we type in input box, it shows nothing because value in input tag is bind to searchText and searchText is initialized to empty. So, we need onChange handler such that when input changes searchText should be changed.
- The onChange event handler is triggered whenever the user types or changes the content of the input field. The event handler is an arrow function that takes an event (e) as its argument
- e is a commonly used shorthand for the event object. It contains information about the event, such as the type of event and additional data specific to the type of event.
- e.target refers to the DOM element that triggered the event. In this case, it refers to the <input> element.
- e.target.value is the current value of the input field at the time of the event. It represents the text entered by the user.
- The setSearchText function is then called with this value, updating the searchText state, which, in turn, updates the value of the input field.
 
10. Whenever we change the local state variable, React re-renders the whole component. Whenever state variables update, react triggers a reconciliation cycle (re-renders the component). React is finding the difference between older virtual DOM and new virtual DOM. React is re-rendering whole component but it is updating only input box value in above example inside the DOM. DOM operations are expensive so only the changes are updated. In above code 9, on each key press the Body component is re-rendered but DOM manipulation is done only on the changes.


# Theory Assignment

1. What is Microservice?
It is a architecture style for developing applications. It allows a large application to be separated to individual parts with 
each part having its own realm of responsibility and those communicate over well defined APIs. In order to serve a single user request, a microservice based application can call on many  internal microservices to compose response. As the services run independently, they can be individually updated, deployed and scaled to meet the demand for specific function of application. In monolithic, all the services run as a single service and all processes are tightly coupled. If one process experience more demand, whole architecture needs to be scaled. Adding or improving monolithic architecture becomes more complex as the code base grows. In microservice architecture, each service is built to meet business capabilities and service performs single function. Microservice enable continuous integration and continous delivery which makes easier to try out new things and roll back if something doesnot work. The low cost of failure enables experimentation. Microservice architecture allows single servie to scale independently based on the demand of application feature it supports. Microservice architecture doesnot follow "one size fits all" approach. Teams have the flexibility to choose best tools to solve specific problem. It also fosters organization of small teams that take ownership of service and as a result, it will reduce development lifecycle. Dividing the software into small resusable well defined modules allows it to be reused for multiple purpose. Suppose a service written can be used as building block for another service so one need not write code from scratch if new capabilities required on top of it. Service independence increases an application's resistance to failure. In monolithic, if something goes wrong, entire application fail. In case of microservice, applications handle total service failure by degrading functionality and not crashing entire application.

Containers are well suited microservice architecture. They let us focus on developing services without worrying about dependency.
Modern cloud native applications are built as microservices using containers. Containers are packages of your software that include everything that it needs to run, including code, dependencies, libraries, binaries and more. Unlike VM(virtual  machine) that run entirely separate OS, containers directly share resources with the os of server that hosts the containers. It makes containers more efficient than VM, because each containerized environment doesnot require complete guest OS. Containers host the individual microservices.

2. What is Monolith architecture?
It means composed all in one piece that is single unit. The different components of monolith application are combined into single
tier software application. Usually, monolith consists of database, server side and client side application. All the application's part are unified and all its functions are managed in one place. It is traditional model and it is a single unit that is independent from other applications. It makes easy to manage code and deployment allowing everything to be released at once. Since monolithic application are single, centralized unit, end-to-end testing can be done easier than distributed applications. The debugging is easier as all of the code is at one place. The deployment is easier as it is just one executable file. But for large application, the development becomes slower and complex. A monolith is constrained with technologies used in monolith. A small change to monolith also requires redeployment of the entire application. Any changes to framework or language affects entire application, making it more expensive and time consuming.

3. What is the difference between monolith and microservice?
A monolith application is built as single unified unit while microservice architecture is collection of smaller, independently
deployable services.

In monolith, one cannot scale a service independently whereas in microservice architecture, it offers flexible scaling. Reliability: If there is error in any module of monolith, it affects the entire application's availability. Whereas microservice 
architecture is highly reliable. We can deploy changes without the threat of having entire application down.
Debugging is easy in monolith but debugging in microservice is challenge as each microservice has its own set of logs which makes
it more complicated. Microservice add more complexity compared to monolith architecture.

4. Why do we need a useEffect Hook?
Hooks are new addition in React 16.8. They let us acces state and other react features without writing class. The effect hook 
lets us perform side effect in components. Data fetching, setting up subscription and manually changing DOM in React components 
are all examples of side effects. There are two types of side effects in React. One is that donot require cleanup and another is that requre cleanup. Sometimes, we write additional code after React has updated DOM. Network requests, manual DOM mutations and logging are examples of side effects that donot require cleanup. It is because we can run them and immediately forget about them.

In React class components, we cannot put side effects into render because it should not cause side effects and it would be too early as we want to perform our effects after React has updated DOM. So, in classes we put side effects into componentDidMount and componentDidUpdate. We have to duplicate code between these two lifecycle methods because we want to perform those sideeffets regardless of whether component just mounted or if it has been updated. We want to make it happen after every render but class components donot have methods so we have to duplicate.

By using useEffect hook, we tell React that the components need to do something after render. React remember function passed in 
effect and it will call after performing DOM updates. We need to put useEffect inside component because, we can access the 
state variable from the effect. We donot need special api to read state variable as it is already in function scope. useEffect hook runs after every render and update. We can customize the running mechanism. We need to pass a function in order to use useEffect hook. The function we pass is our effect.

Effects with cleanup: Sometimes, we need to set up a subscription to some external data source. In that case, we need to clean up
so we donot introduce memory leak. In class based, you would set up subscription with componentDidMount and clean up with 
componentWillMount. Lifecycle methods force us to split logic even though both of them is conceptually related to same effect.
In case of useEffect hook, we return a function. If your effect returns a fucntion, React will run when it is time to cleanup. React performs cleanup when the component unmounts.

We can tell React to skip applying an effect if certain values havenot changed between re-renders by passing an array as an 
optional second argument. If you want to run an effect and clean it up only once (on mount and unmount), you can pass empty
array as second argument. This tells react that , effect doesnot depend on anything and it never needs to re-run.

5. What is Optional Chaining?
The optional chaining operator (?.) accesses an object's property or calls a function. If the object accessed or function called is undefined or null, it returns undefined instead of throwing an error.

6. What is shimmer UI?
It is wireframe of the page with placeholder boxes for images and texts. A shimmer screen is version of UI that doesnot contain 
actual conent. Instead it mimics the page's layout by showing elements in a shape similar to the actual content until the 
actual content is available. It gives people idea about what is about to come. Shimmer screens improve user experience by 
avoiding frustation of having blank screen and giving people idea of what is about to come. It will make our UI feel faster and make people happier. When data takes to load more than 300ms use shimmer. If it takes less than that consider spinner or no shimmer at all. Donot use shimmer for lonag process or background process such as importing or exporting reports instead use progress bar. Donot use shimmer for tiny action such as clicking a button. Use actual content if content doesnot change. This will make people perceive that app/website is loading faster. Always match the size of actual content that will load. And load placeholders sit in the same position for actual content. Donot show shimmer for 100ms before content appears as it will feel slower and distracting.

7. What is the difference between JS expression and statement?
Expression is valid unit of code that resolves to a value or produces a value. There are two type of expressions. Those that have side effects and those that are purely evaluate.
```
Example, x = 7 is the first type. 
Likewise, 3 + 4 is an evaluate expression.
```

A JS program is a sequence of statments. Each statement is an instruction for computer to do something. 
```
let hi = 5;
if(hi > 10) {
    // more statements here.
}
Statements have slots for expressions. 
let hi = /*  some expression */;
```

A handy trick would be try to run chunk of JS in console.log(). If it runs, code is an expression. If you get an error, it is 
a statement or probably invalid JS. Expressions can't exist on their own. They are part of statements. Statements end with 
semicolon but it is not required for statements like if else, while loop and function declaration.

In React, within JSX using {} we can just input JS expressions not statements. If we put statements, we get error because
expressions produce value,statements donot. For if else logic, we need to use ternary operator.

8. What is conditional rendering explain with a code example
Conditional rendering is a term to describe ability to render different UI if a condition is true or false. In react it allows to render different elements or components based on condition. It can be used in many scenarios such as toggling application functionality, showing or hiding elements, handling authentication or authorization, implementing permission levels etc. We can take example of showing either login or logout button based on user's logged in status. Conditional rendering can be implemnted using ternary operator or switch statements or advanced JSX or etc.

9. What is CORS?
CORS is a mechanism which tells the browser that one web application can share or not its resources with other web application. 
Both web apps need to have different origin as same origin allows for sharing of resources easily. Back when cors was not there
browser did not allow two applications of different origin to share resources. cors not only disallowed sharing of resources among different domains but it also did not allow to share resources among
- same domain but sharing not allowed with subdomain
- sharing not allowed in same domain but different port.
- sharing of resources among http and https same domain allowed.
After cors became web standard, browser allows all these resource sharing.


* How cors work?
Suppose we have two apps on two different origins say origin1(client) and origin2(server). Now, if origin1 wants to make POST API call, a cors preflight mechanism is followed. A cors preflight options call is made before actual API call. Browser itself makes a preflight call and server takes responsibility and verifies call is valid or not. The server will send some additional HTTP headers. Then, client knows that request is safe then only after it actual POST request is made.

Some common additional HTTP header is:```["Accept-Control-Allow-Origin": *]```
When we make general API or public, the server sends header as ```*```. Any domain outside this can access this origin. There are many other headers such as Accept-Control-Allow-Methods, etc.

* Does all requests made from one origin to another origin follow cors?
No. There are two type of access control mechanisms. One is simple request and another is preflight request. For some request, 
browser automatically tags them as simple request and will not make preflight call before. We can use some chrome plugins to disable cors from browser or turn off web security if present in respective browser.

10. What is async and await?
async function declares an async function and await keyword is permitted within function body. The keywords async and await 
allow asynchronous, promise based functions to write cleaner code instead of explicitly configuring promise chains.
Async functions can contain zero or  more await expressions. Await expressions make promise returning functions to behave 
as they are synchronous by suspending the execution until returned promise is fulfilled or rejected. The resolved value of promise is the value returned in return of  await expression.

11. What is the use of ```const json = await data.json();```in getRestaurants()
data.json() lets us extract a JSON object from response of request.
data.json() returns a promise. We need to use await to get data from promise.

# Additional 

* Handle errors inside useEffect()
Your catch() handler is going to catch any error thrown in the then() chain before it, including the one caused by a render() due to a setState() call. Even if you don't use setState directly, you may have the same problem if some other code you call uses it (for example, a Redux dispatch()). If you don’t want to catch errors resulting from setState(), and want to only catch network failures (let’s imagine your Promise.resolve() is actually a fetch()), you want to use the second then() argument instead:
```
componentDidMount() {
  Promise.resolve()
  .then(() => {
      this.setState({ loaded: true })
  }, (err) => {
    console.log('An error occurred (but not in setState!)', err);
  });
}
```
 Render errors from setState are not caught in any version of React from v16.0 onwards, and since useState was only introduced
in v16.8, it doesn't seem possible that this could ever have been an issue for hooks.
So, we can catch errors with catch methods.

* Early return 
Early return is a pattern that suggest we avoid other statements by checking the preconditionss and return or throw as early as possible.



* Service workers
Service workers are specialized JS assets that act as proxies between web browsers and web servers. They aim to improve reliability by providing effective offline access and boosting page performance. They will also allow to push notifications and 
background sync APIs for data backup. A service worker is run in a worker context so it has no DOM access. It runs in different thread to main JS that powers the app, so it is non blocking. It is designed to be fully async so synhronous API such as XHR, web storage cannot be used inside a service worker. Service workers run only in HTTPS. Mostly, HTTP connections are  more susceptivle to malicious code and man in middle attacks. Service worker can cache content so that it can be accessed offline.
Background sync API allows web application to defer server synchronization work to their service worker to handle at a later time, if the device is offline. Usage can be sending requests in background if they could not be sent while application is being used.For example, email client application would let users to compose and sent message anytime even when device has no network connection.The application frontend registers sync request, service worker gets alerted when the network is present again and handles the sync.


* useEffect is a hook -> function. We call it giving two parameters, one is callback function and another is dependency array. The callback function will be called whenever useEffect wants to call the function. React makes sure to call it. Whenever rerender happens, after every render. So, if we donot want to call on every re-render, we give empty dependency array.If the useEffect is not dependent on anything, it will be called just once and after initial render. Empty dependency array will be called once after render. If dependency array is ```[searchText] => once after initial render + everytime after rerender (my searchText changes)```
Two ways component changes: whether state changes or props changes.
We call useEffect hook by passing a callback function. It means this function will not be immediately called but will be called whenever useEffect wants to call. Firstly, code of component will be called and after every render, it will pass the function we pass in useEffect. Passing a dependency array will prevent from executing block of code inside useEffect on every component render. If we pass a empty dependency array, it will be called only once after component render. Component re-renders in two conditions either props change or state change. Suppose if there is some value in dependency array, it will be called once after initial render + everytime after rerender (my searchText changes). For API call, we need to have empty dependency array and api call needs to be done inside useEffect.