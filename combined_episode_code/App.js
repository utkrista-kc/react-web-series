import React from "react";
import ReactDOM from "react-dom/client";

const elem = <span>React Element</span>;

const title = (
  <h1 id="head" tabIndex="5">
    {elem}
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);
