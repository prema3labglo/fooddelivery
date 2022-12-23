import { Card, CardActions, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../base/baseurl";

export default function Restaurentfoods() {
  const { id } = useParams();
  const [foodlist, setFoodlist] = useState();

  const loadData = () => {
    axios
      .get(baseUrl("/food/"))
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error));
  };
  const style = {
    float: "left",
    display: "flex",
    marginTop: "150px",
    margin: "100px",
    width: "450px",
    height: "450px",
    backgroundColor: "6F6B6B",
    // backgroundColor: "white",
    marginLeft: "450px",
    borderRadius:"10%"
  };

  useEffect(() => loadData(), []);
  return (
    <>
      {foodlist
        ?.filter((el) => el.restaurant == id)
        ?.map((el) => {
          return (
            <>
              <Card sx={{ ...style }}>
                <CardMedia
                  component="img"
                  height="300"
                  sx={{ maxWidth: "450px" }}
                  image={el.image}
                  alt="Paella dish"
                />
                <Typography variant="h6"
                component="a" sx={{marginTop:"320px",marginLeft:"-290px"}}>
                    <Typography variant="h6"
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "rage italic",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}>{el.name}</Typography>
                 <Typography variant="h6"
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "rage italic",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}> Rs.{el.price}</Typography>

                </Typography>
                
                
              
              </Card>
             
            </>
          );
        })}
    </>
  );
}
