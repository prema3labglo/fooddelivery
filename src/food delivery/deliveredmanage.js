import {
  Card,
  CardContent,
  CardMedia,
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
import dateFormat from "dateformat";
import baseUrl from "../base/baseurl";
import { borderRadius } from "@mui/system";

export default function Deliveredmanager() {
  const [list, setList] = useState();
  const [cartlist, setCartlist] = useState();
  const [foodInfo, setFoodInfo] = useState();
  const [profileList, setProfileList] = useState();
  const token = localStorage.getItem("token");
  const admins = "8efb6f05f1a84f8eab9a0a77fb589a5c288a2561";

  const style = {
    float: "left",
    display: "flex",
    marginTop: "110px",
    margin: "100px",
    width: "260px",
    height: "260px",

    // backgroundColor: "white",
    marginLeft: "500px",
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
      .then((response) => setCartlist(response.data))
      .catch((error) => console.log(error));
  };

  const loadData = () => {
    axios
      .get(baseUrl("/manager/deliveredorders/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setList(res.data))
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
      .then((response) => setProfileList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
    cartList();
    foodlist();
    profile();
  }, []);

  return (
    <>
      <br />
      <br />
      <center>
        <TableContainer sx={{ maxWidth: "1000px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((details) => {
                return (
                  <>
                    {details.cart.map((cart) => {
                      return (
                        <>
                          {cartlist
                            ?.filter((el) => el.id == cart)
                            ?.map((det) => {
                              return (
                                <>
                                  {foodInfo
                                    ?.filter((list) => list.id == det.food)
                                    ?.map((el) => {
                                      return (
                                        <>
                                          <TableRow>
                                            <TableCell>
                                              {" "}
                                              <CardMedia
                                                component="img"
                                                height="150"
                                                image={el.image}
                                                sx={{ width: "250px", borderRadius:"10%" }}
                                              />
                                            </TableCell>
                                            <TableCell> 

                                              <Typography sx={{color:"crimson",marginLeft:"-20px"}}> 
                                              <h4 sx={{color:"black"}}>DETAILS</h4> 
                                                <Typography>
                                                  {el.name.toUpperCase()}
                                                </Typography>
                                                <Typography>
                                                  Rs.{el.price}
                                                </Typography>
                                              </Typography>
                                            </TableCell>
                                            <TableCell>
                                              {profileList
                                                ?.filter(
                                                  (profile) =>
                                                    profile.id ==
                                                    details.customer
                                                )
                                                .map((info) => {
                                                  return (
                                                    <>
                                                      <Card
                                                      variant="outlined"
                                                        sx={{
                                                          bgcolor:"transparent",
                                                          
                                                          maxWidth: "200px",
                                                          color: "tomato",
                                                          borderRadius:"10%"
                                                        }}
                                                      >
                                                        <CardContent>
                                                          <h4>ADDRESS</h4>
                                                          <Typography>
                                                            {info.username.toUpperCase()}
                                                          </Typography>
                                                          <Typography>
                                                            {
                                                              info.profile
                                                                .address.toUpperCase()
                                                            }
                                                          </Typography>
                                                          <Typography>
                                                            {info.profile.city.toUpperCase()}
                                                          </Typography>
                                                        </CardContent>
                                                      </Card>
                                                    </>
                                                  );
                                                })}
                                            </TableCell>
                                            <TableCell>
                                              <Typography sx={{color:"darkgreen"}}>
                                              <Typography>DELIVERED</Typography>
                                              <Typography>
                                                {dateFormat(
                                                  details.delivered_datetime,
                                                  "dddd, mmmm dS, yyyy"
                                                )}
                                              </Typography>
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        </>
                                      );
                                    })}
                                  {/* <Typography>{det.food}</Typography> */}
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
      </center>
    </>
  );
}
