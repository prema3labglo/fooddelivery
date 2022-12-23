import { Button, Card, CardContent, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../base/baseurl";
import Modalcomponent from "../modal/modalcomponent";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { Link } from "react-router-dom";

export default function CreateFood() {
  const token = localStorage.getItem("token");
  const [create, setCreate] = useState({
    name: "",
    price: "",
  });
  const [foodDetails,setFoodDetails]=useState()
  

  const [image, setImage] = useState();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setId();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCreate({
      ...create,
      is_organic: true,
      is_vegan: "true",
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    let form_data = new FormData();
    form_data.append("name", create.name);
    form_data.append("price", create.price);
    form_data.append("is_organic", true);
    form_data.append("is_vegan", true);
    form_data.append("image", image, image?.name);

    axios
      .post( baseUrl("/manager/foods/"), form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  
  

  return (
    <>
    {}
  
     
          <Card variant="outlined" sx={{ maxWidth: "474px", height: "800px",marginTop:"60px",marginLeft:"750px",bgcolor:"rgb(157, 223, 240) "}}>
            <center>
            
              <br/><br/><br/>
             
              <br/><br/><br/>
              <h1 > <RamenDiningIcon sx={{fontSize:"70px"}}/>create food</h1>
              <br/><br/><br/>
              <form type="multipart/form-data">
                <TextField
                  type="text"
                  name="name"
                  onChange={handleChange}
                  label="name"
                />
                <br />
                <br/>
                <br/><br/>
                <TextField
                  name="price"
                  type="number"
                  onChange={handleChange}
                  label="price"
                />
                <br />
                <br />
                <br/><br/>
                <TextField
                  name="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <br />
                <br />
                <br/><br/>
                <Button variant="contained" color="primary" sx={{marginLeft:"50px"}}><Link to={-1}>Back</Link></Button>
              &nbsp;
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                  add food<RamenDiningIcon />
                </Button>
               
              </form>
            </center>
          </Card>
       
    </>
  );
}
