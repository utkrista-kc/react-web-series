import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent constructor");
  }

  async componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent render");
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is Namaste React Web series</h2>
        <User name={"Utkrista (function)"} location={"Sydney"} />
        {/* <UserClass name={"First "} location={"Sydney"} /> */}
        {/* <UserClass name={"Second "} location={"US"} />
        <UserClass name={"Third "} location={"NZ"} /> */}
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is Namaste React Web series</h2>
//       {/* <User name={"Utkrista (function)"} location={"Sydney"} /> */}
//       <UserClass name={"Utkrista (class)"} location={"Sydney"} />
//     </div>
//   );
// };

export default About;
