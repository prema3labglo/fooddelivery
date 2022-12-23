import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import baseUrl from "../base/baseurl";
import Modalcomponent from "../modal/modalcomponent";

export default function ResetPassword(){
    const [details,setDetails]=useState()
    const [open, setOpen] = useState(true);
    const token=localStorage.getItem("token")
  const handleOpen=()=>{
    setOpen(true)
   
  }
    
  const handleClose = () => setOpen(false);

    const handleChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }

    const submit =()=>{
        axios.put(baseUrl("api/change-password/"),details,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`,
              },


        })
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error))
    }



    return(
        <>
       <Modalcomponent
        open={open}
        handleClose={handleClose}
        modalValue={
            <>
           <Button onClick={handleClose} sx={{marginLeft:"340px"}}>close</Button>
           <br/>
           <br/>
           <center>
            <TextField variant="outlined" label="old password" name="old_password" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField variant="outlined" label="new password" name="new_password" onChange={handleChange}/>

            <br/>
            <br/>
            <br/>
            <Button onClick={submit} variant="contained">submit</Button>
            </center>
            </>
        }/>
      
        </>
    )
}