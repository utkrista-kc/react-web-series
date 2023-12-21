Episode 13: Time for Test

1. Testing is a huge domain in testing. We will be concerned about developer testing. There are many types of testing. 

2. A developer can do various type of testing.
- Manual testing: Testing manually the features developed. This is not very efficient because if we built a new feature we cannot test everything again so that it does not break. Even if we add single line of code, it can introduce bugs anywhere. In large applications, a lot of components are interacting to each other, if we modify some functionality, it will impact a lot of components causing bugs in the application. We need to worry about single line of code too.

- Write code to test the application: We write the test cases that will test the our application.

3. Types of testing (developer can do)
- Unit Testing: Unit testing means you test react components in isolation. Suppose, we want to test the Header component in isolation. It tests one specific component.
- Integration Testing: It is testing the integration of the components. So many components collaborate to make a feature work and we develop a flow and test that functionality.
- End to end testing (E2E testing): It is testing the application from the user lands on the website to leaves the application. It starts from landing, clicking the loggin button, etc. It simulates what the user does throughout the application. It requires different tools such as Selenium, etc in order to test. 
As a developer, we are concerned mostly about first two types of testing. 

4. We will be using react testing library in order to write test cases for React. Testing library has existed for longer time. React Testing Library is built on DOM testing library as to other testing libraries such as angular testing library, view testing library, etc. If we had used create-react-app, this testing library comes and it is integrated already with the application. In  our application, we have built everything from the scratch so we need to integrate react testing library. React Testing library uses Jest. It is delightful Javascript testing library. DOM testing library uses JEST behind the scenes. And JEST also uses babel. With Babel, we need to install additional dependencies.

```
npm i -D @testing-library/react
npm i -D jest
npm install --save-dev babel-jest @babel/core @babel/preset-env // install babel dependencies
```
We then create babel.config.js file and write 
```
module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```
We know that parcel uses babel behind the scenes. When we configure babel, parcel also use babel so this configuration will conflict with parcel as it already has babel configuration. So, we need to change parcel behaviour.
Read this for more info: https://parceljs.org/languages/javascript/#babel

So, we create a .parcelrc file and write
```
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.{js,mjs,jsx,cjs,ts,tsx}": [
      "@parcel/transformer-js",
      "@parcel/transformer-react-refresh-wrap"
    ]
  }
}
```
Now, parcel is disabled so that defautl transpilation of babel occurs. 
Now, we also configure jest by initializing: 
```npx jest --init``` 
We will use jsdom - when we run test cases, it does not run on browser so it requires some environment for test cases to run. JSDOM is a library which parses and interacts with assembled HTML just like browser. It is not actually a browser but it implements web standarts like browsers do. 
After selecting the configuration, such as babel, jsdom, we will get jest.config.js file.
If we are using jest 28 or later, jest-environment-jsdom package needs to be installed separately.
```npm install --save-dev jest-environment-jsdom```

jsdom is also no longer default environment. We can enable jsdom globally by editing jest.config.js
```
module.exports = {
  testEnvironment : 'jsdom'
}
```
Previously, it used to come along with jest but now we have to install separately.

5. First of all, lets test some simple JS test. We created a file sum.js
```
export const sum = (a, b) => {
  return a + b;
};
```
When we run npm run test, we see that no test files are found. So, it searches the files under this directory ```__tests__```. If we create this file, any js or ts file under this directory anywhere in the application will be considered a test file. The following file naming conventions will also be considered as a test file 
```
Headers.test.js
Headers.test.ts
Headers.spec.js
Headers.spec.ts
```
This ```___``` double underscores is called dunder method. We use this as a reserved characters.

6. While writing test functions, we write test that takes a string and a callback function as parameters. We created sum.test.js that consists of code as follows: 
```
import { sum } from "../sum";

test("Sum function should calculate sum of two numbers", () => {
  const result = sum(3, 4);

  // This line called assertion
  expect(result).toBe(7);
});

```
Most of the time, we have assertion in the code. Even if we do not write assertion, it works and test cases pass. But we need to have assertion because we need to expect something. This is just JS testing and we will also see React testing.

7. First testing, if we go to contact page, lets test whether contact component loads or not. In order to test the rendering, we use render method from the @testing-library/react.
We wrote this initially, but we got an error. 
```
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

test("Should load contact us component", () => {
  render(<Contact />);

  const heading = screen.getByRole("heading"); // It will find all the heading syntax

  expect(heading).toBeInTheDocument(); // Finds out whether the heading was inside the screen or not
});

```
Error:  Support for the experimental syntax 'jsx' isn't currently enabled (5:10). JSX is not enabled. So, we have to add @babel/preset-react library. ```npm i -D @babel/preset-react``` and add this to the babel config " ["@babel/preset-react", { runtime: "automatic" }],". This babel preset react is helping jsx code to html so that it can read properly.

Error: TypeError: expect(...).toBeInTheDocument is not a function. It is because we have not installed the library, 
@testing-library/jest-dom. This is the test code that test whether the contact page loaded or not. 

```
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should load contact us component", () => {
  render(<Contact />);

  const heading = screen.getByRole("heading"); // It will find all the heading syntax

  expect(heading).toBeInTheDocument(); // Finds out whether the heading was inside the screen or not
});

```
Suppose if we have rendered the component in JS dom. Role can be heading, button, etc. We can also use function         .```getByText("Submit")```

Beauty of JEST is when it fails, it shows what was rendered. 
One small snapshot of test case file is 
```
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should load contact us component", () => {
  render(<Contact />);

  const heading = screen.getByRole("heading"); // It will find all the heading syntax

  expect(heading).toBeInTheDocument(); // Finds out whether the heading was inside the screen or not
});

test("Should load button inside contact component", () => {
  render(<Contact />);

  const button = screen.getByRole("button"); // It will find all the button syntax

  expect(button).toBeInTheDocument(); // Finds out whether the button was inside the screen or not
});

test("Should load input name inside Contact component", () => {
  render(<Contact />);

  const inputName = screen.getByPlaceholderText("name");

  expect(inputName).toBeInTheDocument();
});

test("Should load 2 input boxes in the Contact Component", () => {
  render(<Contact />);

  // Quering
  const inputBoxes = screen.getAllByRole("textbox"); // When multiple items we use getAll

  console.log(inputBoxes.length); // An array is returned of React virtual DOM element

  expect(inputBoxes.length).toBe(2);
});

```

8. Sometimes test cases become huge, so we can group the test cases using describe. 
```
describe("Contact Us Page Test Case", () => {
  test("Should load contact us component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading"); // It will find all the heading syntax

    expect(heading).toBeInTheDocument(); // Finds out whether the heading was inside the screen or not
  });

  test("Should load button inside contact component", () => {
    render(<Contact />);

    const button = screen.getByRole("button"); // It will find all the button syntax

    expect(button).toBeInTheDocument(); // Finds out whether the button was inside the screen or not
  });
})
```
We can have multiple describe blocks.
9. Instead of "test", we can even write "it". There is no difference between "it" and "test". "it" is basically an alias of "test". Both are the same thing. Reading the cases becomes easy with "it".

10. We try to write test cases for header component and check that the header component should have login button.
```
import Header from "../Header";
import { render } from "@testing-library/react";

it("Should load Header Component with a login button", () => {
  render(<Header />);
});

```
The test case fails. It is because our application is using redux. We are rendering Header in JS-dom. JS DOM understand JSX or JS code but it doesnot understand redux such as useSelector() so that it fails. So, we have to provide redux store to Header when rendering. Along with this "Link" component also causes error because it comes from react-router-dom. So, we have to provide router to this Header component.

```
import { Provider } from "react-redux";
import Header from "../Header";
import { render, screen } from "@testing-library/react";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render Header Component with Cart items 0", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const CartItems = screen.getByText(/Cart/); // We can also pass regex over here
  expect(CartItems).toBeInTheDocument();
});
```
We can fire click event for the button in this way: 
```

it("Should change Login Button to Logout On Click", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(logoutButton).toBeInTheDocument();
});

```

11. Testing a component by passing props can be done as: 
```
import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("should render Restaurant component with props data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("Veena Stores");
  expect(name).toBeInTheDocument();
});

```