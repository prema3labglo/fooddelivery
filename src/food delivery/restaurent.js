import { styled } from "@mui/material/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Modalcomponent from "../modal/modalcomponent";
import baseUrl from "../base/baseurl";
import { useNavigate } from "react-router-dom";

// Make sure to use correct spelling eg: Restaurant
export default function Restaurent() {
  const [apidata, setApidata] = useState();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);

  // Give necessary spacing between lines
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const navigate = useNavigate();

  const style = {
    float: "left",
    display: "flex",
    marginTop: "150px",
    margin: "100px",
    width: "400px",
    height: "450px",
    backgroundColor: "#5c5958",
    // backgroundColor: "white",
    marginLeft: "450px",
  };
  const fetching = (id) => {
    console.log("id", id);
    navigate(`/resfoodlist/${id}`);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const handleClose = () => setOpen(false);

  const loadData = () => {
    axios
      .get(baseUrl("/restaurant/"))
      .then((response) => setApidata(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => loadData(), []);

  return (
    <div>
      <div
        className="restaurent"
        style={{
          backgroundImage:
            'url("https://finland.ihg.com/wp-content/uploads/2022/01/hotel_indigo_restaurant-1600px.jpg")',
          marginLeft: "300px",
          maxWidth: "1700px",
          height: "400px",
        }}
      >
        <center>
          <Typography
            variant="h4"
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Segoe UI Symbol",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              marginLeft: "600px",
            }}
          >
            ENJOY YOUR MEAL
          </Typography>
        </center>
      </div>

      <center>
        {apidata?.map((data) => {
          return (
            <>
              <Card sx={{ ...style }}>
                <CardMedia
                  component="img"
                  height="300"
                  sx={{ maxWidth: "300px", marginLeft: "55px" }}
                  image={data.image}
                  alt="Paella dish"
                  onClick={() => fetching(data.id)}
                />
                <br />
                <CardContent>
                  <Typography
                    sx={{
                      marginTop: "280px",
                      marginRight: "300px",
                      marginLeft: "-220px",
                    }}
                  >
                    <Typography variant="h6">
                      <b>{data.name}</b>
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => handleOpen(data.id)}
                    >
                      view
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
        <Modalcomponent
          open={open}
          handleClose={handleClose}
          modalValue={apidata
            ?.filter((el) => el.id == id)
            .map((el) => {
              return (
                <>
                  <center>
                    <h4>Restaurent details</h4>
                    <Typography>
                      <Typography>{el.name}</Typography>
                      <Typography>foodtype:{el.food_type}</Typography>
                      <Typography>
                        <br />
                        <i>address</i>
                        <br />
                        {el.address},{el.city}
                      </Typography>
                      <Typography>
                        open time:{el.open_time.slice(0, 5)}
                      </Typography>
                      <Typography>
                        close time:{el.close_time.slice(0, 5)}
                      </Typography>
                    </Typography>
                  </center>
                </>
              );
            })}
        />
      </center>
    </div>
  );
}
