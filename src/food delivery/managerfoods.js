import { Button, Card, CardActions, CardContent, CardMedia, Fab, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../base/baseurl";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Modalcomponent from "../modal/modalcomponent";
import { useNavigate } from "react-router-dom";

export default function Managerfoodlist() {
  const [foodList, setFoodList] = useState();
  const [profileList, setProfileList] = useState();
  const [reslist, setReslist] = useState();
  const [id,setId]=useState()
  const [create,setCreate]=useState()
  const [image,setImage]=useState()
  const [foodDetails,setFoodDetails]=useState()
  const manager = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const admins = "8efb6f05f1a84f8eab9a0a77fb589a5c288a2561";

  const navigate=useNavigate()

  const style = {
    float: "left",
    display: "flex",
    marginTop: "110px",
    margin: "50px",
    width: "400px",
    height: "400px",
    backgroundColor: "FB9D5C",
    // backgroundColor: "white",
    marginLeft: "300px",
  };

  const [open, setOpen] = useState(false);
  const handleOpen=(details)=>{
    setOpen(true)
    setFoodDetails(details)
    setId(details)
    console.log("details",id)
  }
    
  const handleClose = () => setOpen(false);

  const foodApicall = () => {
    axios
      .get(baseUrl("/food/"))
      .then((response) => setFoodList(response.data))
      .catch((error) => console.log(error));
  };

  const profile = () => {
    axios
      .get(baseUrl("/profile/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${admins}`,
        },
      })
      .then((response) => setProfileList(response.data))
      .catch((error) => console.log(error));
  };

  const restaurant = () => {
    axios
      .get(baseUrl("/restaurant/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${admins}`,
        },
      })
      .then((response) => setReslist(response.data))
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setFoodDetails({
      ...foodDetails,
      is_organic: true,
      is_vegan: "true",
      [e.target.name]: e.target.value,
    });
  };

  const editData=()=>{
    let form_data = new FormData();
    form_data.append("name", foodDetails.name);
    form_data.append("price", foodDetails.price);
    form_data.append("is_organic", true);
    form_data.append("is_vegan", true);
    form_data.append("image", image, image?.name);
    console.log("form",form_data)
    axios.put(baseUrl(`/manager/foods/${id.id}/`),form_data,{
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`
      },

    })
    .then((response)=>console.log(response.data))
    .catch((error)=>console.log(error))
  }

  const deletePost=(id)=>{
    axios.delete(baseUrl(`/manager/foods/${id}/`),{
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`
      }

    }) 
    .then((response)=>console.log(response.data))
    .catch((error)=>console.log(error))
  }
  const fetch=()=>{
    navigate("/postfood")
}
const fetch1=()=>{
  navigate("/managerpost")
}

  



  useEffect(() => {
    foodApicall();
    profile();
    restaurant();
  }, []);

  return (
    <>
    <Fab variant="extended" color="secondary" onClick={()=>fetch()} sx={{marginLeft:"1300px",marginTop:"30px"}}> <AddIcon/>add post</Fab>
    <Fab variant="extended" color="success" onClick={()=>fetch1()} sx={{marginTop:"30px"}}> <AddIcon/>create Restaurent</Fab>
    
      {profileList
        ?.filter((datas) => datas.username == manager)
        ?.map((details) => {
          return (
            <>
              {reslist
                ?.filter((list) => list.manager == details.id)
                ?.map((el) => {
                  return (
                    <>
                      {foodList
                        ?.filter((food) => food.restaurant == el.id)
                        ?.map((dt) => {
                          return (
                            <>
                              <Card
                                sx={{
                                  ...style,
                                  borderRadius: "10%",
                                  variant: "outlined",
                                }}
                              >
                                <CardContent>
                                  <CardMedia
                                    component="img"
                                    height="250"
                                    width="400"
                                    image={dt.image}
                                    sx={{ borderRadius: "10%", maxWidth:"400px"}}
                                  />
                                  <Typography
                                    guttorBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    {dt.name}
                                  </Typography>
                                  <Typography
                                    guttorBottom
                                    variant="h5"
                                    component="div"
                                  >
                                    Rs. {dt.price}
                                  </Typography>
                                  <CardActions>
                                    <Button variant="outlined" onClick={()=>handleOpen(dt)}>
                                      <BorderColorIcon color="secondary" />
                                      Edit
                                    </Button>
                                    <Button variant="outlined">
                                      {" "}
                                      <DeleteForeverOutlinedIcon color="error"  onClick={()=>deletePost(dt.id)}/>
                                      delete
                                    </Button>
                                  </CardActions>
                                </CardContent>
                              </Card>
                              <Modalcomponent open={open} handleClose={handleClose} modalValue={
          <Card>

            <CardContent>
              <Button onClick={handleClose}>close</Button>
              <form type="multipart/form-data">
            <TextField
                  type="text"
                  name="name"
                  onChange={handleChange}
                  label="name"
                  value={foodDetails?.name}
                />
                <br />
                <br/>
                <br/><br/>
                <TextField
                  name="price"
                  type="number"
                  onChange={handleChange}
                  label="price"
                  value={foodDetails?.price}
                />
                <br />
                <br />
                <br/><br/>
                <TextField
                  name="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  
                  
                />

                <Button variant="contained" color="secondary" onClick={editData}>post</Button>

                <br />
                <br />
                <br/><br/>
                </form>
                

            </CardContent>
          </Card>
        }/>
                              <br />
                            </>
                          );
                        })}
                    </>
                  );
                })}
            </>
          );
        })}

      

       
    </>
  );
}
