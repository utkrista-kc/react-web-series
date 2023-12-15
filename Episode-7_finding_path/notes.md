Episode 7 - Finding the path

1. 
```
useEffect(() => {
console.log("useeffect called)
}, [])

//Case 1:  useEffect without dependency array
useEffect(() => {
console.log("useeffect called)
})

//Case 2:  Empty dependency array
useEffect(() => {
console.log("useeffect called)
}, [])

//Case 3:  Dependency passed in array
useEffect(() => {
console.log("useeffect called)
}, [dependencyName])
```
The useEffect hook is called everytime the component renders (default behaviour). But we can also change the behaviour of useEffect. The dependecny array is not mandatory but callback function is. 
Case 1: If no dependency array is provided, useEffect is called on every component render.
Case 2: If empty dependency array provided, useEffect is called on initial render(just once) that is when the component is rendered for the first time. Even if the component re-renders, useEffect is not called after the initial one.
Case 3: When dependency is passed in array, useEffect hook is called when the dependency changes. If dependency array is       ```[btnReact]```, called everytime btnReact is updated.
Although the three cases exist, useEffect is always called on initial render.

2. Never create useState variables outside of component. It will throw an error. Use state variables are used to create local state variables in your functional components. Always write useState on the top of the functional component so that you do not have inconsistencies in the code. JS is single single threaded synchronous so that it runs line by line. 

3. Never create useState inside, if-else statements or for loop. It will create inconsistencies. Never use useState hook inside a condition. Sometimes there will be variable and sometimes there will not be. 

4. react-router-dom : popular for routing. It is a npm package. We create routing configuration in App.js by importing createBrowserRouter from react-router-dom.
```
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <>
  },
  {
    path: "/about",
    element: <About />,
  },
]);
```
After we write the router configuration, RouterProvider will provide the routing configuration to our application.
```root.render(<RouterProvider router={appRouter} />);``` 
In this code, we have provided the routing configuration to our application. Before this, we have directly passed our component here but now we pass RouterProvider.
If we provide random URL ```http://localhost:1234/xyz```, React router dom has created good looking error page for the page not found. We can also create our own error page. We can solve that using errorElement.

```
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
```
React-router-dom gives important hook. It gives useRouteError hook. It gives better error in our page. If something starts with use, it is error. 

5. typing rafce automatically creates a skeleton of a functional component in VS code.

6. If we want to keep the header intact and only change the page below when we navigate to different routes, we have to create children routes. We have to create children routes that are list of paths on the root route and also specify an outlet on the main layout component.

```
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
]);
```
In the code above, the Outlet is filled by the children according to the path.
This Outlet component will not be seen our HTML. The Outlet content will be replaced by the component. End user will not know that we have Outlet in our code.

7. We can link our pages using anchor tags ```<a href="/about">About Us</a>``` but never use anchor tags in React. It is because the whole page got refreshed when using anchor page. We have to do something so that we can navigate to another page without reloading the whole page. We will use something as Link given by react-router-dom. This Link component works exactly as anchor tags. Instead of href we use "to". When we use anchor tags, whole page got reloaded.
```
import { Link } from "react-router-dom";
<li>
    <Link to="/contact">Contact Us</Link>
</li>
```
So, React applications are called single page application. When we go to new page, we are not changing page, we are just changing components.

8. There are two types of routing that we can have in web applications. 
- Client Side Routing: When we are moving across pages, we are not making network calls as in React. We are not fetching new page. We have all the components and we are just changing the components.
- Server Side Routing: When the page gets loaded, the network call is made and the whole page is fetched and loaded. It refreshes the whole page. We make the network call and page is coming from the server.

9. Dynamic routing: For example, we have dynamic route for all the restaurants in Swiggy page. We show different page for different data. We want to build routing like /page name/id.
In our router configuration, we can pass the dynamic routes as: 
```
   {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
```
In our component to load the specific id data we can use useParams hook given by react-router-dom.

```
import { useParams } from "react-router-dom";
const { resId } = useParams();
```

10. In situations of map as in the code below, the key should be placed in the parent JSX.
```
 <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
</div>
```

11. ```<Link>``` inside HTML elements in the inspect section is anchor tag ```<a>```. Link is a component given by react-router-dom. But behind the scenes, it is using anchor tag. Link is a wrapper around anchor tag. HTML does not understand Link. React-router-dom is making it a anchor tag. But react router dom is also keeping track of all the links. Browser understands anchor tags, so we have to convert into something that browser understand.

# Theory Assignment

1. What are various ways to add images to our App? Explain with code examples.
Images in React App can be kept in public or src folder and import into component or HTML file to show it to the users.
Only the files inside src are prcessed by webpack. We can put any js or css file, webpack will not process it. Only files inside
public can be used by public/index.html. We can use special variable PUBLIC_URL.
Various ways to add images are as follows:
- Display an image from URL in React
We can use img tag and set its src with URL of the image. Optionally, we can use alt to set short description of the image.
  ```
    <img
        src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
        alt="car"/>
  ```

- Display an image from local path in React
We can download the image and place it to src directory. We can import the image and set src of img tag with imported image.
```
import MyImage from './thumbnail.webp';
 <img src={MyImage} alt="horse" />
Depending upon setup, we can also use require() to display local images.
<img src={require('./thumbnail.webp')} alt="horse" />
```

- Display an image from public directory
We can also render images that are in public directory of our project. We can use an absolute path when images are placed in public directory.
```<img src="/images/thumbnail.webp" alt="horse" />```

2. What would happen if we do console.log(useState())?
We get an array, [undefined, f], the first state variable is undefined and the set function name is bound dispatchSetState.

3. How will useEffect behave if we don't add a dependency array?
If we donot pass dependency array, it runs after first initial render of component and on every re-render of component.

4. What is SPA?
It is a web application document that loads single web document and updates body of the document with the use of Javascript APIs.
Performance is increased when one need not load whole page from server and the experience is more dynamic. However that are some
disadvantages such as SEO, more effort to maintain state, implement navigation and performance monitoring. SPAs donot require 
page reloading. Examples: Facebook, gmail, google map, etc. SPA is fast because the resources(HTML, JS, Scripts) are loaded only 
once during entire lifespan of application. Only data is transmitted back and forth. SPAs are easy to debug with Chrome. It is easy to make mobile application because same backend code for web application can be used for mobile application. SPA can cache 
any local storage effectively as request is sent only once where all data is stored and can be accessed. It also works offline.
SPA is slow to download because heavy client frameworks are required to be loaded to the client. Memory leak in Javascript can
cause even powerful system to slow down.
There are two main design patterns for web application: Multi page application(MPA) and Single Page Application(SPA)

In MPA, in every change requires a new page to be fetched from the server. These applications are bigger than SPA. It has more complexityto develop. It is easy for proper SEO management as different keyword can be optimized for different page. In MPA, there is no option of using same backend for web and mobile applications. Frontend and backend development are tightly coupled. The development is complex so the development time is longer.

5. What is difference between Client Side Routing and Server Side Routing?
In server side routing whenever we click a navigation or link, whole page is refreshed and loaded with new page. It is because
a GET request is sent to server and server sends back a new document discarding the old page. It has become a standard for long time for search engines are optimized for webpages that come from server. Every request needs a full page refresh so unnecessary data is being requested.It takes some time for the page to be rendered.

In client side routing, browser detects that user has clicked link. Routing library catches and detects that it is not an external link and prevents making HTTP GET request. The routing library manually changes the URL and then changes the state of the application.The application then processes state changes. It might be new components changes or requesting some data from server or any other but the response is not entirely a webpage. The whole page won't refresh using client side routing. Routing between is faster and easy to implement smooth transition and animation between views. Some cons are: Whole webpage needs to be loaded at first so initial loading takes some time. For the routing to work, it requires extra code or even some library. Search engine crawling is less optimized. Google is making efforts to make good progresson crawling single paged application but it is not efficient as server side routed websites.A plain HTML document can link to other documents and the browser handles the history stack itself. Client Side Routing enables developers to manipulate the browser history stack without making a document request to the server.

# Additional 

* Formik is a small library that helps in following ways:
    - Getting values in and out of form state
    - Validation and error messages
    - Form submission handling
    - It is scalable, performant form helper with minimal APIs.

* Why not Redux forms?
    - Form state are very short lasting(ephemeral) and local, so tracking it in redux or any flux library is unnecessary.
    - Redux form calls entire top level redux reducer on every key stroke. It is not a problem in small apps but for large application input latency increases.
    - Minimized formik is 12.7kb whereas redux-form is 22.5 kb.

Formik is compatible with React15+. Formik keeps track of form state with few reusable methods and event handlers(handleChange, handleBlur, handleSubmit) which are passed as props. We pass form's initial values and a on submit function to use useFormik() hook. The hook returns form state and helper methods 
in variable we assign. In Login.js, the variable is formik.
Few helper methods: 
    - handleSubmit: handles submission
    - handleChange: change handler to pass to each ```<input>, <select> or <textarea>```
    - values:Form's current values

These values are passed to respective props. Instead of managing all the event handlers and managing form input, we just use 
useFormik() hook. We pass id and name to the html attribute same to the property defined in initialValues. We access the field's value using same name such as formik.values.email. It is not good to show errors on each keystroke. So, formik keeps track of fields that have been visited or not. It keeps information in an object called touched. To use touched, we pass formik.handleBlur to each input's onBlur prop.

* Object.values() static method returns array of values of the given object's key-value pairs.
```
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};
console.log(Object.values(object1));
Result: Array ["somestring", 42, false]
```
* To provide our configuration to our app, a component RouterProvider is imported from react-router-dom. React router dom is not created by Meta, it is developed by Remix.

* 



