import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../base/baseurl";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

export default function ActiveOrder() {
  const [active, setActive] = useState();
  const [cartdetails, setCartdetails] = useState();
  const [foodInfo, setFoodInfo] = useState();
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState();

  const style = {
    float: "left",
    display: "flex",
    marginTop: "100px",
    margin: "150px",
    width: "300px",
    height: "300px",
    textAlign: "center",
  };

  const orderList = () => {
    axios
      .get(baseUrl("manager/activeorders/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setActive(response.data))
      .catch((error) => console.log(error));
  };

  const cartList = () => {
    axios
      .get(baseUrl("/cartlist/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setCartdetails(response.data))
      .catch((error) => console.log(error));
  };

  const fill = active?.filter((el) => el.is_cancelled == false);
  console.log("fill", fill);

  const handleAccept = (id) => {
    const body = { is_accepted: true };
    axios
      .put(baseUrl(`/manager/accept/${id}/`), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleCancel = (id) => {
    const body = { is_cancelled: true };
    axios
      .put(baseUrl(`manager/cancell/${id}/`), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const foodlist = () => {
    axios
      .get(baseUrl("/food/"))
      .then((response) => setFoodInfo(response.data))
      .catch((error) => console.log(error));
  };

  const profile = () => {
    axios
      .get(baseUrl("/profile/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setInfo(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    orderList()
    cartList()
    foodlist()
    profile()
  },[])

 

  return (
    <>
      <Typography
        variant="h6"
        component="a"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "rage italic",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "black",
          textDecoration: "none",
          marginLeft: "400px",
          marginTop: "40px",
          color:"MenuText"
        }}
      >
        <LunchDiningIcon sx={{ fontSize: "40px", marginLeft: "-40px",color:"darkmagenta" }} />{" "}
        ACTIVE INFO
      </Typography>

      <TableContainer sx={{ maxWidth: "1200px", marginLeft: "400px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {active
              ?.filter((el) => el.is_cancelled == false)
              .map((details) => {
                return (
                  <>
                    {details.cart.map((el) => {
                      return (
                        <>
                          {cartdetails
                            ?.filter((check) => check.id == el)
                            .map((det) => {
                              return (
                                <>
                                  {foodInfo
                                    ?.filter((datas) => datas.id == det.food)
                                    .map((el) => {
                                      return (
                                        <>
                                          <TableRow>
                                            <TableCell>
                                              <Card sx={{ maxWidth: "100px" ,borderRadius:"-40%" }}>
                                                <CardMedia
                                                  component="img"
                                                  height="150"
                                                  image={el.image}
                                                  sx={{ width: "250px" }}
                                                />
                                              </Card>
                                            </TableCell>
                                            <TableCell>
                                              <Typography
                                                sx={{ marginLeft: "-70px",color:"#f06f0c" }}
                                              >
                                                <h3>ORDERED FOOD</h3>
                                                <Typography>
                                                  {el.name.toUpperCase()}
                                                </Typography>
                                                <Typography>
                                                  Rs.{el.price}
                                                </Typography>
                                                <Typography>
                                                  QUANTITY:{det.quantity}
                                                </Typography>
                                              </Typography>
                                            </TableCell>
                                            {info
                                              .filter(
                                                (el) =>
                                                  el.id == details.customer
                                              )
                                              .map((dt) => {
                                                return (
                                                  <TableCell>
                                                    <Card sx={{maxWidth:"200px",height:"200px",borderRadius:"40px" }}>
                                                      <center>
                                                        <Typography sx={{marginTop:"20px",color:"darkmagenta"}}>
                                                          <h3>ADDRESS</h3>
                                                    <Typography>
                                                      {dt.username.toUpperCase()}
                                                    </Typography>
                                                    <Typography>
                                                      {dt.profile?.address.toUpperCase()}
                                                    </Typography>
                                                    <Typography>{dt.profile?.phone_number}</Typography>
                                                    </Typography>
                                                    </center>
                                                    </Card>
                                                  </TableCell>
                                                );
                                              })}
                                            {details.is_accepted ? (
                                              <TableCell>
                                                <Fab
                                                  variant="extended"
                                                  sx={{ bgcolor: "green",color:"white" }}
                                                >
                                                  accepted
                                                </Fab>
                                              </TableCell>
                                            ) : (
                                              <TableCell>
                                                <Fab
                                                  variant="extended"
                                                  sx={{ bgcolor: "orange" }}
                                                  onClick={() =>
                                                    handleAccept(details.id)
                                                  }
                                                >
                                                  pending
                                                </Fab>
                                              </TableCell>
                                            )}
                                            {details.is_cancelled == false &&
                                            details.is_accepted == false ? (
                                              <TableCell>
                                                <Fab
                                                  variant="extended"
                                                  sx={{ bgcolor: "salmon" }}
                                                  onClick={() =>
                                                    handleCancel(details.id)
                                                  }
                                                >
                                                  cancel
                                                </Fab>
                                              </TableCell>
                                            ) : (
                                              <TableCell>
                                                {" "}
                                                <Fab
                                                  variant="extended"
                                                  disabled
                                                  sx={{ bgcolor: "green" }}
                                                >
                                                  {" "}
                                                  cancel
                                                </Fab>
                                              </TableCell>
                                            )}
                                            <></>:
                                          </TableRow>
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
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
