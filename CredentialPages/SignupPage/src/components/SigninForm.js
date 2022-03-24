import React, { useState } from 'react'

const SignupForm = ( {Signup, error} ) => {
    const [details, setDetails] = useState({name:"", email:"", password: "", confirm: ""});
    const submitHandler = e => {
        e.preventDefault();

        Signup(details);
    } 

  return (
    <form onSubmit={submitHandler}>
        <div className="form-inner">
        <h2>Sign Up</h2>
            {(error != "") ? ( <div className="error">{error}</div>) : ""}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <div className="form-group">
                <label htmlFor="confirm">Confirm Password:</label>
                <input type="password" name="confirm" id="confirm" onChange={e => setDetails({...details, confirm: e.target.value})} value={details.confirm}/>
            </div>
            <input type="submit" value="SIGN UP" />
        </div>
    </form>
  )
}

export default SignupForm