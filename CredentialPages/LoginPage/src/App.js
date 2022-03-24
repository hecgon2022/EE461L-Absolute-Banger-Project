import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  //we can replace this with the user credential database later on
  const adminUser = {
    email: "admin@admin.com",
    password: "admin69"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match");
      setError("Invalid Credentials, Please Try Again!");
    }
  }

  const Logout = () => {
    setUser({
      name: "",
      email: ""
    });
  }

  return (
    <div className="App">
      {(user.email != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
