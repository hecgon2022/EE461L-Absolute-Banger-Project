import React, { useState } from 'react';
import SignupForm from './components/SigninForm';

function App() {

  const adminUser = {
    email: "",
    password: "",
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Signup = details => {
    console.log(details);

    if (details.password == details.confirm){
      console.log("Signed up");
      setUser({
        name: details.name,
        email:details.email,
      });
    } else {
      console.log("Details do not match");
      setError("Invalid Credentials, Please Try Again!");
    }
  }

  return (
    <div className="App">
      {(user.email != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
        </div>
      ) : (
        <SignupForm Signup={Signup} error={error} />
      )}
    </div>
  );
}

export default App;
