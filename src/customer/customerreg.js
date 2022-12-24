import {
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../base/baseurl";

export default function Customerreg() {
  const [data, setData] = useState();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  // Give functions and variables sensible names
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleDataChange = (e) => {
    setData({
      ...data,

      [e.target.name]: e.target.value,
    });
  };
  const handleProfileChange = (e) => {
    setProfile({
      ...profile,

      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = () => {
    setData({ ...data, profile: profile });
    console.log("dt", data);
    axios
      .post("http://127.0.0.1:8000/register/", data, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log("data", data);
  };

  return (
    <>
      <div>
        <center>
          <br />
          <br />
          <br />
          <h2 style={{ color: "white" }}>Register</h2>
          <Card
            sx={{
              maxWidth: "600px",
              height: "900px",
              borderRadius: "10%",
              opactiy: -0.5,
            }}
            className="card"
          >
            <h2>Sign up</h2>
            <FormGroup sx={{ maxWidth: "300px" }}>
              <TextField
                name="username"
                label="username"
                variant="outlined"
                onChange={handleDataChange}
              />
              <br />
              <br />

              <TextField
                name="password"
                label="password"
                onChange={handleDataChange}
              />
              <br />
              <br />

              <TextField
                name="first_name"
                label="first_name"
                onChange={handleDataChange}
              />
              <br />
              <br />

              <TextField
                name="last_name"
                label=" last_name"
                onChange={handleDataChange}
              />
              <br />
              <TextField
                name="birth_date"
                type="date"
                onChange={handleProfileChange}
              />
              <br />
              <br />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleProfileChange}
                name="gender"
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
              </RadioGroup>
              <br />
              <br />
              <TextField
                name="phone_number"
                type="number"
                label="phone_number"
                onChange={handleProfileChange}
              />
              <br />
              <br />
              <TextField
                name="city"
                type="text"
                label="city"
                onChange={handleProfileChange}
              />
              <br />
              <br />
              <Button variant="contained" color="primary" onClick={handleSignup}>
                sign up
              </Button>
              <br />
              <Typography>
                Already have any account
                <Button variant="outlined" onClick={handleLoginRedirect}>
                  sign in
                </Button>
              </Typography>
            </FormGroup>
          </Card>
        </center>
        <br />
      </div>
    </>
  );
}
