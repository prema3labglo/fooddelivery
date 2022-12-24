import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import baseUrl from "../base/baseurl";
import Modalcomponent from "../student/modalcomponent";

export default function ForgetPassword() {
    const [details,setDetails]=useState()
    const [open, setOpen] = useState(true);
    const token=localStorage.getItem("token")
  const handleOpen=()=>{
    setOpen(true)
   
  }
  const handleChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }
    
  const handleClose = () => setOpen(false);

  const handleSubmit=()=>{
    console.log("det",details)
    axios.post(baseUrl("/api/password_reset/"),details)
    .then((res)=>console.log(res.data.token))
    .catch((error)=>console.log(error))
  }


    return(
        <>
        <Modalcomponent 
        open={open}
        onClose={handleClose}
        modalValue={
          <>
           <TextField variant="outlined" name="email" onChange={handleChange}/>
         <br/>
         <br/>
         <Button variant="contained" onClick={handleSubmit}> confirm</Button>
          </>

        }/>
        
        </>
    )
}