import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChanges = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth().post("/login", user)
    .then(response => {
      console.log(response)
      localStorage.setItem("token", response.data.payload);
      props.history.push("/bubble-page")
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App! Please Log In!</h1>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input 
        type="text"
        name="username"
        onChange={handleChanges}
        />
        <label>Password: </label>
        <input 
        type="password"
        name="password"
        onChange={handleChanges}

        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
