import React from "react";
import ReactDOM from "react-dom/client";

/**
 * <div>
 *      <div id ="child">
 *          <h1>I'm h1 tag</h1>
 *           <h2>I'm h2 tag second child</h2> Suppose if we have additional children, we can pass array of children
 *      </div>
 * Another child also added as nesting
 *        <div id ="child2">
 *          <h1>I'm h1 tag</h1>
 *           <h2>I'm h2 tag second child</h2> Suppose if we have additional children, we can pass array of children
 *      </div>
 * </div>
 *
 *
 * ReactElement(Object) => HTML(Browser understands)
 */

// We can create the above nested React elements in the following way.
const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "This is Namaste React."),
    React.createElement("h2", {}, "I'm h2 tag."),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I'm h1 tag."),
    React.createElement("h2", {}, "I'm h2 tag."),
  ]),
]);

// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "abc" },
//   "Hello World from React!"
// );

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
