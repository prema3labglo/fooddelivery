import { Button, Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../base/baseurl";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Redirectlogin() {
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
  });
  const [refresh, setRefresh] = useState({});
  const fetch=useNavigate()

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmitdata = () => {
    console.log("profile", profileData);

    
    axios
      .post(baseUrl("login/"), profileData)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data));
        let tokenData = JSON.parse(localStorage.getItem("token"));
        let decodeToken = jwtDecode(tokenData.access);
        localStorage.setItem("access", JSON.stringify(decodeToken));
        fetch("/cuslogin/foodlist");
      })
      .catch((error) =>{
       
         if(error.response.status==401){
          console.log("error")
          let token = JSON.parse(localStorage.getItem("token"));
          axios.post(baseUrl("/api/token/refresh/",{refresh:token.refresh}))
          .then((response)=>console.log(response.data))
          .catch((error)=>console.log(error))
      } });
  };


  //  const token= localStorage.getItem("token")
  // const token1 = JSON.parse(token)
  //  setRefresh({refresh:JSON.parse(token?.refresh)})
  //  console.log("token",token1?.refresh)

  //  useEffect(()=>{
  //     if(token1?.refresh !=""){
  //         setTimeout(()=>{
  //             const body={refresh:token1?.refresh}
  //             axios.post(baseUrl("/api/token/refresh/"),body)
  //             .then((response)=>console.log(response.data))
  //             .catch((error)=>console.log(error))
  //         },12000)

  //     }

  //  },[token1?.refresh])
  // useEffect(() => {
  //   if (token1 !== undefined) {
  //     fetch("/cuslogin/foodlist");
  //     localStorage.setItem("token", token);
  //   } else {
  //     fetch("/redirect");
  //   }
  // }, [token1]);

  return (
    <>
      <center>
        <br />
        <Card sx={{ maxWidth: "300px" }}>
          <CardContent>
            <TextField name="username" onChange={handleChange} />
            <br />
            <br />
            <br />
            <TextField name="password" onChange={handleChange} />
            <br />
            <br />
            <Button onClick={handleSubmitdata}>login</Button>
          </CardContent>
        </Card>
      </center>
    </>
  );
}
