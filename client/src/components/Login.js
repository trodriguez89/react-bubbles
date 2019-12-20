import React, { useState } from "react";

import styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const LogIn = styled.div`
  margin: 0 auto;
`
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FormStyle = styled.form`
  width: 250px;
`
const LogInButton = styled.button`
  width: 25%;
  margin-top: 5px;
`
const LabelStyle = styled.label`
  padding: 0;
  margin-top: 5px;
`
const InputStyle = styled.input`
  width: 95%;
`
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
      props.history.push("/bubblepage")
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <LogIn>
      <h1>Welcome to the Bubble App! Please Log In!</h1>
      <FormDiv>
      <FormStyle onSubmit={handleSubmit}>
        <LabelStyle>Username: </LabelStyle>
        <InputStyle 
        type="text"
        name="username"
        onChange={handleChanges}
        value={user.username}
        />
        <LabelStyle>Password: </LabelStyle>
        <InputStyle 
        type="password"
        name="password"
        onChange={handleChanges}
        value={user.password}
        />
        <LogInButton>Log In</LogInButton>
      </FormStyle>
      </FormDiv>
    </LogIn>
  );
};

export default Login;
