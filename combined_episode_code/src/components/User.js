import { useEffect, useState } from "react";

const User = ({ name, location }) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Namaste React OP");
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("useEffect Return");
    };
  });

  return (
    <div className="user-card">
      <h1>Count = {count}</h1>
      <h1>Count2 = {count2}</h1>
      <h2>Name: {name}</h2>
      <h3>Location: {location}</h3>
      <h4>Contact: @utkrista</h4>
    </div>
  );
};

export default User;
