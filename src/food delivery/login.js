import {
  Button,
  Card,
  CardContent,
  Fab,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../base/baseurl";
import Modalcomponent from "../modal/modalcomponent";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [passData,setPassData]=useState()
  const [details,setDetails]=useState()
  const [token, setToken] = useState();
  const [profiles, setProfiles] = useState();
  const fetch = useNavigate();
  const [check, setCheck] = useState();
  const admin = "8efb6f05f1a84f8eab9a0a77fb589a5c288a2561";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReg=()=>{
    navigate("/")
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log("data", data);
    axios
      .post(baseUrl("/login/"), data)
      .then((response) => setToken(response.data.token))
      .catch((error) => console.log(error));
    setCheck(
      profiles
        ?.filter((el) => el.username == data.username)
        ?.map((el) => el.profile.is_manager)
        .join()
    );
  };
  console.log("check", check);

  const checkData = () => {
    axios
      .get(baseUrl("/profile/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${admin}`,
        },
      })
      .then((response) => setProfiles(response.data))
      .catch((error) => console.log(error));
  };

  const handleChange1=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
    
  

  const handleSubmitdata=()=>{
    console.log("det",details)
    axios.post((baseUrl("/api/password_reset/")),details,{
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },

    })
    .then((res)=>console.log(res.data))
    .catch((error)=>console.log(error))
  }

  const handleChangepassword=(e)=>{
    setPassData({...passData,[e.target.name]:e.target.value})

  }

  const reSetting =()=>{
    console.log("pass",passData)
    axios.post(baseUrl("/api/password_reset/confirm/"),passData)
    .then((res)=>console.log(res.data))
    .catch((error)=>console.log(error))
  }


  useEffect(() => {
    checkData();

    if (token !== undefined && check == "true") {
      fetch("/createfood");
      console.log("success");

      localStorage.setItem("token", token);
      localStorage.setItem("username", data.username);
    } else if (token !== undefined && check == "false") {
      fetch("/cuslogin/foodlist");
      localStorage.setItem("token", token);
      localStorage.setItem("username", data.username);
    } else {
      fetch("/login");
    }
  }, [token]);

  return (
    <>
      <center>
        <div>
          <br />
          <Card
            variant="outlined"
            sx={{
              maxWidth: "500px",
              height: "600px",

              borderRadius: "10%",

              marginTop: "250px",
              backgroundImage:
                'url("https://static.vecteezy.com/system/resources/previews/006/413/040/original/blue-gradient-pastle-soft-beautiful-abstract-background-you-can-use-this-background-for-your-content-like-as-technology-video-gaming-promotion-card-banner-sports-presentation-website-etc-vector.jpg")',
            }}
            style={{ backgroundColor: "transparent", boxShadow: "salmon" }}
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
              <br />
              <br />
              <br />
              <Typography sx={{ color: "blue" }}>
                <Fab
                  variant="extended"
                  color="secondary"
                  sx={{ marginLeft: "30px" }}
                  onClick={handleOpen}
                >
                  forget password ?
                </Fab>
                <br/>
              </Typography>
              <Typography>Don't have any account?</Typography>
              <br/>
              <br/>
              <Button variant="contained" onClick ={handleReg}>Register</Button>
            </CardContent>
          </Card>

          <Modalcomponent
            open={open}
            handleClose={handleClose}
            modalValue={
              <>
                <Card>
                  <CardContent>
                    <center>
                    <CloseIcon onClick={handleClose} sx={{marginLeft:"400px"}}/>

                    <br/>
                    <h4>Reset Your Password</h4>
                    <br/>
                    <TextField
                      variant="outlined"
                      name="email"
                      onChange={handleChange1}
                      label="enter your email"
                    />
                    <br />
                    <br />
                    <Button variant="contained" onClick={handleSubmitdata}>
                      {" "}
                      confirm
                    </Button>
                    <br/><br/>
                    <Typography>Confirm your password</Typography>
                    <br/>
                    <TextField variant="outlined" name="token" onChange={handleChangepassword} label="enter your otp"/>
                    <br/>
                    <br/><br/>
                    <TextField variant="outlined" name="password" onChange={handleChangepassword} label="new password"/>
                    <br/>
                    <br/><br/>
                    <Button variant="contained" onClick={reSetting}>submit</Button>
                    </center>
                  </CardContent>
                </Card>
              </>
            }
          />
        </div>
      </center>
    </>
  );
}
