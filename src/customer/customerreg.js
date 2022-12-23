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
  const fetch = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setData({
      ...data,

      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setProfile({
      ...profile,

      [e.target.name]: e.target.value,
    });
  };

  const Signup = () => {
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
                onChange={handleChange}
              />
              <br />
              <br />

              <TextField
                name="password"
                label="password"
                onChange={handleChange}
              />
              <br />
              <br />

              <TextField
                name="first_name"
                label="first_name"
                onChange={handleChange}
              />
              <br />
              <br />

              <TextField
                name="last_name"
                label=" last_name"
                onChange={handleChange}
              />
              <br />
              <TextField
                name="birth_date"
                type="date"
                onChange={handleChange2}
              />
              <br />
              <br />
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleChange2}
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
                onChange={handleChange2}
              />
              <br />
              <br />
              <TextField
                name="city"
                type="text"
                label="city"
                onChange={handleChange2}
              />
              <br />
              <br />
              <Button variant="contained" color="primary" onClick={Signup}>
                sign up
              </Button>
              <br />
              <Typography>
                Already have any account
                <Button variant="outlined" onClick={fetch}>
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
