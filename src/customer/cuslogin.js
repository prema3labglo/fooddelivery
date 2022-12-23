import { Button, Card, CardContent, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../base/baseurl";

export default function Custlogin() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState();
  const fetch = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log("data", data);
    axios
      .post(baseUrl("/login/"), data)
      .then((response) => setToken(response.data.token))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (token !== undefined) {
      fetch("/cuslogin/foodlist");
      localStorage.setItem("token", token);
    } else {
      fetch("/cuslogin");
    }
  }, [token]);

  return (
    <>
      <center>
        <Paper sx={{ maxWidth: "400px", bgcolor: "white" }}>
          <Card
            variant="outlined"
            sx={{ maxWidth: "400px", height: "400px" }}
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <CardContent>
              <br />
              <br />
              <h2>Login!</h2>
              <TextField
                name="username"
                onChange={handleChange}
                label="username"
              />
              <br />
              <br />
              <br />
              <TextField
                name="password"
                onChange={handleChange}
                label="password"
              />
              <br />
              <br />
              <br />
              <br />
              <Button variant="contained" onClick={handleSubmit}>
                Login
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </center>
    </>
  );
}
