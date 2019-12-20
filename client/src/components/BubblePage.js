import React, { useState, useEffect } from "react";
import axios from "axios";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

import styled from "styled-components";

const MainContain = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
`

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  
  const logOut = event => {
    event.preventDefault();
    localStorage.clear("token")
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth().get("/colors")
    .then(response => {
      console.log(response)
      setColorList(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <MainContain>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      </MainContain>
    </div>
  );
};

export default BubblePage;
