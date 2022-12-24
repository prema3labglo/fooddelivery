import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../base/baseurl";
import Modalcomponent from "../student/modalcomponent";

export default function ManagerPost() {
    const[apidata,setApidata]=useState()
    const[image,setImage]=useState()
    let form_data=new FormData()
    const token=localStorage.getItem("token")
    const [open, setOpen] = useState(true);
    const navigate=useNavigate()
    
    const handleClose = () => setOpen(false);

    const handleChange=(e)=>{
        setApidata({...apidata,[e.target.name]:e.target.value})
        
    }
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    console.log("image",image);

    const handleSubmit=()=>{
       setApidata({...apidata,"image":image?.name})
       let form_data = new FormData();
       form_data.append('image',image, image?.name)
       form_data.append('name', apidata.name);
       form_data.append('food_type', apidata.food_type);
       form_data.append('city', apidata.city);
       form_data.append('address', apidata.address);
       form_data.append('open_time', apidata.open_time);
       form_data.append('close_time', apidata.close_time);
       console.log("form_data,",form_data);

       const body = {name:apidata.name,food_type:apidata.food_type,city:apidata.city,address:apidata.address,open_time:apidata.open_time,close_time:apidata.close_time,image:form_data}

        console.log("vv",apidata)
        axios.post(baseUrl('manager/newrestaurant/'),form_data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Token ${token}`
                }
            }
        )
            .then((response) =>
                
                (response.data)
               )
            .catch((error) => console.log(error))

    
        }

     
    return(
        <>
        
          <Modalcomponent
        open={open}
        handleClose={handleClose}
        modalValue={
      
        <center>
            <br/><br></br>
            <h2>Create Restaurent</h2>
            <Button onClick={handleClose}>close</Button>
        <form encType="multipart/form-data">
        <Card sx={{maxWidth:"500px",height:"600px"}}>        
        <TextField name="name" variant="standard" label="name" onChange={handleChange}/>
        <br/><br/>
        <TextField name="food_type" variant="standard" label="food_type" onChange={handleChange}/>
        <br/><br/>
        <TextField name="city" variant="standard" label="city"onChange={handleChange}/>
        <br/><br/>
        <TextField name="address" variant="standard" label="address" onChange={handleChange}/>
        <br/><br/>
        <TextField name="open_time" type="time" variant="standard" onChange={handleChange}/>
        <br/><br/>
        <TextField name="close_time" type="time" variant="standard"  onChange={handleChange}/>
        <br/><br/>
        <TextField type="file" name="image" onChange={handleImage}/>
        <br/><br/>
        <Button variant="contained" onClick={handleSubmit} color="secondary">post</Button>
        </Card>
        </form>
        </center>}/>

        </>
    )
}