# Episode 4: Talk is Cheap, Show me the code

1. Plan before writing code. First step for planning is, you need to know a layout our UI. We have to make basic structure, can be sketched and create a visual picture. A textual planning can be as follows: 
```
/**
 * Header
 *  - Logo
 *  - Nav Items
 *
 * Body
 *  - Search
 *  - Restaurant Container
 *    - Restaurant Card
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 */
```

2. Inline css should be passed as object in JSX. 
```
const styleCard = {
  backgroundColor: "yellow",
};

const RestaurantCard = () => {
  return (
    <div className="res-card" style={styleCard}>
      <h3>Meghna Foods</h3>
    </div>
  );
};

Instead of passing style card as above, we can directly write in the div as style as 
style={{backgroundColor: '#f0f0f0}}
```

3. In react we have props known as properties. Suppose if I want to pass data to component dynamically, we can pass it as a prop. Props are normal arguments to function. This process is called as passing props to component. To pass data dynamically, we pass it as  props. We can pass any number of props. We can also destructure when we access those props.

```
const RestaurantCard = (props) => {
  return (
    <div className="res-card" style={styleCard}>
      <img
        className="res-logo"
        src="https://www.holidify.com/images/cmsuploads/compressed/1515644556794_20190527160433.jpeg"
        alt="res-logo"
      />
      <h3>{props.resName}</h3>
      <h4>{props.cuisine}</h4>
      <h4>4.4 stars</h4>
      <h4>38 minutes</h4>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { resName, cuisine } = props;
  return (
    <div className="res-card" style={styleCard}>
      <img
        className="res-logo"
        src="https://www.holidify.com/images/cmsuploads/compressed/1515644556794_20190527160433.jpeg"
        alt="res-logo"
      />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>4.4 stars</h4>
      <h4>38 minutes</h4>
    </div>
  );
};
 This destructuring of objects is plain JS.
```

4. Config driven UI. For example, the carousel, offers in Swiggi will be different for different location. The website driven by data or config is called. Controlling the UI from backend is config driven UI. It is latest practise used by all companies. We can write UI once and we can control the UI from the backend.

5. Cloudinary is CDN. Better practise is used to use map, filter & reduce.

6. When using curly braces instead of () in code below, the display was blank. 
```
    {resList.map((restaurant) => (
          <RestaurantCard resData={restaurant} />
        ))}
```

7. Warning: Each child in a list should have unique key props. It means that each of the list item should be provided with key property. Key should be unique. When we are in a container with different children. When there are components at same level, they need unique representation. When a new item is received, React has to add that item to DOM. If we donot provide key, React will rerender all the restaurant cards because React does not know which item was newly added. Suppose if we building infinite scroll or render large number of components, if React re-render all the components, that is a bad practise. When we do loop or map, we have to pass a key. In DOM graph, all the children will be at the same level (). Some people use index as keys because each card will have different keys. React official doc says that using index as keys is a bad practise. Index as a key is an antipattern.

not using keys (not acceptable) << index as key << unique id (best practise)


# Assignment Questions

1. Is JSX mandatory for React? - No
2. Is ES6 mandatory for React? - No
3. 
```
{TtileComponent} vs {<TitleComponent />} vs {<TitleComponent><TitleComponent />} in JSX
{TtileComponent} - to load React Elements.
{<TitleComponent />} vs {<TitleComponent><TitleComponent />} - To load Components
```

4. How can I write comments in JSX? - Similary to writing in JS. We can use block comments {/* Comment */} or multiline comments 
```
{
    /*
    *
    *
    */
}
```

The only thing is they need to be wrapped in curly braces. We cannot use HTML comments because it thinks that they are real DOM nodes.

5. What is <React.Fragment></React.Fragment> and <> </>?
It is for component to return multiple elements. Fragments let us to group list of children without adding extra node to the DOM.
Fragments declared explicity with <React.Fragment> might have keys. One use case can be to map a collection to an array of fragments. For example, to create a description list. As of now, key is the only attribute that can be passed to Fragment. <>   </> - It is shorter syntax for declaring fragments but it doesnot support keys or attributes.

6. What is Virtual DOM?
Virtual DOM(VDOM) is a programming concept where ideal or virtual representation of the UI elements is kept in memory and synced
with real DOM by library such as ReactDOM. The process is called reconciliation. This approach enables declarative API of React.
If we tell React to maintain any UI state, it makes sure it matches with DOM. Virtual DOM is pattern rather than a technology
and many people might refer it differently. In React, virtual DOM is assoicated with React elements because they are the 
objects representing user inferface. Reacts also users internal objects known as "fibers" to hold additional information of the 
component tree. They might be also considered as part of virtal DOM representation in React.

* React Elements
They are the smallest building blocks of React apps. Elements describe what we want to see on screen. They are plain objects so they are easier and cheaper to create than browser DOM elements. React DOM is responsible to update real DOM to match React elements. Applications built inside react have single root DOM node but if one is using React in existing project,there can be many isolated root nodes. React elements are immutable. Once created we cannot change their attributes or children.

* Is Shadow DOM same as virtual DOM?
No, it is different. Shadow DOM is browser technology that is designed for scoping variables and CSS in web components. Whereas
virtual DOM is a concept implemented by library in Javascript on top of Browser API. Shadow DOM used by browser APIs for a long time which is used to encapsulate inner structure of an element. Important concept of web component is that they keep markup style, structure and behaviour separate from other code on page so that parts donot clash and code can be kept nice and clean. Shadow DOM API is a key part of this, providing a way to attach hidden separated DOM to an element.

7. What is Reconciliation in React?
Refer Episode 3 Notes

8. What is React Fiber?
It is new reconciliation engine introduced in React 16.  Its goal is to enable incremental rendering of virtual DOM.
It is ongoing reimplementation of React's core algorithm. It is culmination by React developers for 2 years. The goal of react 
Fiber is to increase its suitability for areas like animation, layout and gestures. Its headline feature is incremental 
rendering: the ability of splitting rendering work into chunks and spread it over multiple frames. Other key features, the ability to pause, abort or reuse work as new updats come in; the ability to assign priority to different types of updates and new concurrency primitives. 
Primary goal of React Fiber is to take advantage of scheduling. One needs to be able to:
- pause work and come back later, assign priority to different types of work, reuse previously completed work, abort work if it is no longer needed.
Fiber represents a unit of work. When executing a function, a new stack frame is added to stack. The stack frame represents work performed by that function. When dealing it with UIs, if too much work is executed at once, it cause animations to break frames and look choppy. Some of the work might not be required if it is superseded by most recent update. New browsers and React native implement APIs to address exact problem. Low priority function is called in idle period and high priority function is called in next animation frame. The problem is in order to use those apis, we need way to break rendering into incremental units. Relying on call stack, it will do work until stack is empty. It would be great if we could customize behaviour of callstack to optimize rendering of UIs. That is the purpose of React Fiber. Fiber is reimplementation of stack, specialized for React components. You can think of single fiber as a virtual stack frame. The advantage of reimplementing stack is that you can keep stack frames in memory and execute whenever and however you want.
Fiber is JS object that contains information about component, its input and output.

9. Why we need keys in React? When do we need keys in React?
Keys help React identify which items have added, removed or changed. Keys should be given to elements inside an array to give 
them stable identity. Keys need not be globally unique but should be unique among siblings. We donot use index as keys if the 
order of items may change. It impacts performance and might cause issues with component state.

10. Can we use index as keys in React?
Keys can be used if the order of items donot change. But it is better to not use index as keys. Using keys might break your 
application and display wrong data. As key is only thing in React that is used to identify DOM elements. So, if one pushes an item to list or remove something in the middle, if the key is same the React DOM assumes that the DOM elements that it represents is same component as before but that is not.

11. What is props in React?
Components lets us to split UI into independent reusable pieces. Components are like JS functions that accepts arbitary inputs 
known as props and return React elements describing what should appear on the screen. Whether you declare component as function or class, it mush never modify its own props. Such function are called pure because they never attempt to change inputs and they always return same result for same inputs. In contrast, impure functions change their own input. React has single strict rule. All react components must act like pure functions with respect to their props. Application's UIs are dynamic and change over time.

12. What is a config drivern UI?
CDD(Configuration Driven Development): Applications are composed dynamically based on configuration. Independent components are built first starting at atomic level. An interface usually JSON is provided to compose higher level UI. CDD is a way of using modularity to build loosly coupled set of components that are composed together using a common interface. Example: Dynamic web forms.


# Additional

* Why you need virtual dom- Reconciliation in React
Reconciliation is algorithm React uses to diff one tree from other. It determines what needs to change in UI and what does not change in UI. Whenever you have multiple children with same attribute, we need key to know which child is changed. So, react will only re-render that child if unique key is given. Virtual DOM is representation of actual DOM. React uses Reconciliation that uses diff algorithm for finding difference between trees. React will only rerender diff portion of our app. If new div is added, React will not know which div is added. So rerenders all the child divs. So, if we give key, React knows which child is added so renders only that.

* Can we use React.Framgment inside React.Fragment? - We cannot give style to React.Fragment. We have to use div.

* Any piece of JSX componet you write, there can only be one parent. JSX can only have one parent so there is something known as 
React.Fragment. React.Fragment is a component which is exported by React. We can use it in our code by using 
```
<React.Fragment></React.Fragment>
``` 
We can even use div and make parent but if we donot want that we can use React.Fragment. React.Fragment is like an empty tag.
<> </> can also be used for React.Fragment. It is handy but we cannot pass any style or attribute in empty tag.


