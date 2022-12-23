import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Mainpage() {

    const navigate=useNavigate()

    const fetch=()=>{
        navigate("/register")
    }
    const fetch1=()=>{
        navigate("/cusreg")
    }
  return (
    <div >
      <center>
        <Card sx={{maxWidth:"1400px", backgroundImage:'url("https://e0.pxfuel.com/wallpapers/273/959/desktop-wallpaper-pizza-8-1920-x-1200-chicken-pizza.jpg")',  backgroundRepeat: "no-repeat",backgroundAttachment: "fixed",
backgroundSize: "cover"}}>
    <CardContent>  <b><h1>Order food Enjoy your meal</h1></b></CardContent>
        <Card
          sx={{
            marginLeft:"-600px",
            marginTop:"300px",
            maxWidth: "256px",
            height: "256px",
            backgroundImage:
              'url("https://findicons.com/files/icons/2526/bloggers/256/admin.png")',
            backgroundRepeat: "no-repeat",
          }}
        >
          <CardContent>
            <br />
            <br />
            <br /> <br />
            <br />
            <br /> <br />
            <br /><br /> <br /><br/>
            
            <Button color="inherit" variant="contained" onClick={()=>fetch()}>Admin</Button>
          </CardContent>
        </Card>
        <br></br>
        <Card   sx={{
            marginLeft:"800px",
            marginTop:"-270px",
            maxWidth: "256px",
            height: "256px",
            backgroundImage:
              'url("https://www.shutterstock.com/image-vector/man-riding-scooter-delivery-icon-260nw-625212923.jpg")',
            backgroundRepeat: "no-repeat",
          }}>
            <CardContent>
                <Button color="secondary" variant="contained" sx={{marginTop:"190px"}} onClick={fetch1}>customer</Button>

            </CardContent>

        </Card>
        </Card>
      </center>
    </div>
  );
}
