import React from "react";

// Class Based Component

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      count: 0,
      userInfo: {
        name: "Dummy",
        location: "Dummy",
        avatar_url: "http://dummy-photo.com",
      },
    };
    // console.log(this.props.name + "Child constructor");
  }

  async componentDidMount() {
    // console.log(this.props.name + "Child Component Did Mount");
    // const data = await fetch("https://api.github.com/users/utkrista-kc");
    // const json = await data.json();
    // this.setState({
    //   userInfo: json,
    // });
    // console.log(json);
    this.timer = setInterval(() => {
      console.log("Namaste React OP");
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.count != prevState.count) {
      // code.
    }
    console.log("component did update");
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log("componentWillUnmount");
  }
  render() {
    // console.log(this.props.name + "Child render");
    const { name, location, avatar_url } = this.state.userInfo;

    const { count } = this.state;
    return (
      <div className="user-card">
        <img src={avatar_url} alt="avatar" />
        <h1>Count = {count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Count Increase
        </button>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @utkrista</h4>
      </div>
    );
  }
}

export default UserClass;

/**
 * MOUNTING CYCLE ---------------
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy>
 * ComponentDidMount
 *      <API Call>
 *      <this.setState> - state variable updated, triggers the reconciliation
 *
 * UPDATE CYCLE --------
 * Render (API data)  - render updated with new data
 *      <HTML> new API data
 * componentDidUpdate
 *
 */
