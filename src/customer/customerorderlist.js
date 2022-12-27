import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
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

export default function Customerorderlist() {
  const [orderdlist, setOrderdlist] = useState();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token",token.access)
  const [food, setFood] = useState();
  const [cartList, setCartList] = useState();
  const [reslist, setReslist] = useState();

  const style = {
    float: "left",
    display: "flex",
    marginTop: "100px",
    // margin: "100px",
    width: "270px",
    height: "405px",
    marginLeft: "400px",
  };

  const customerData = () => {
    axios
      .get(baseUrl("/customer/activeorders/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => setOrderdlist(response.data))
      .catch((error) => console.log(error));
  };

  const foodlist = () => {
    axios
      .get(baseUrl("/food/"),{
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => setFood(response.data))
      .catch((error) => console.log(error));
    console.log(food);
  };
  const cartData = () => {
    axios
      .get(baseUrl("/cart/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => setCartList(response.data))
      .catch((error) => console.log(error));
  };

  const cancelledOrder = (id) => {
    console.log("id", id);
    const body = { is_cancelled: true };
    axios
      .put(baseUrl(`customer/cancell/${id}/`), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const delivered = (id) => {
    console.log("ids", id);
    const body = { is_delivered: true };
    axios
      .put(baseUrl(`customer/approvedelivered/${id}/`), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })

      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const restaurant = () => {
    axios
      .get(baseUrl("/restaurant/"),{
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => setReslist(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    foodlist();
    cartData();
    customerData();
    restaurant();
  }, []);
  return (
    <>
      <TableContainer sx={{ marginLeft: "500px" }}>
        <TableHead>
          <TableRow>
            <TableCell>food image</TableCell>
            <TableCell></TableCell>
            <TableCell>details</TableCell>
            <TableCell>info</TableCell>
          </TableRow>
          <TableBody>
            {orderdlist?.map((orders) => {
              return (
                <>
                  {orders.cart?.map((cart) => {
                    return (
                      <>
                        {cartList
                          ?.filter((data) => data.id == cart)
                          ?.map((view) => {
                            return (
                              <>
                                {food
                                  ?.filter((el) => el.id == view.food)
                                  ?.map((dt) => {
                                    return (
                                      <>
                                        <TableRow>
                                          <TableCell>
                                            <CardMedia
                                              component="img"
                                              height="200"
                                              width="200"
                                              image={dt.image}
                                              sx={{ borderRadius: "10%" }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            {dt.name.toUpperCase()}
                                            <Typography>
                                              {" "}
                                              Rs.{dt.price}
                                            </Typography>
                                            <Typography></Typography>
                                          </TableCell>

                                          {reslist
                                            ?.filter(
                                              (ele) => ele.id == dt.restaurant
                                            )
                                            ?.map((res) => {
                                              return (
                                                <>
                                                  <TableCell>
                                                    <Card
                                                      sx={{ maxWidth: "250px" }}
                                                    >
                                                      <CardContent>
                                                        <Typography>
                                                          <Avatar
                                                            src={res.image}
                                                          />
                                                        </Typography>
                                                        <Typography>
                                                          {res.name.toUpperCase()}
                                                        </Typography>
                                                        <Typography>
                                                          {res.address.toUpperCase()}
                                                        </Typography>
                                                        <Typography>
                                                          {res.vegan}
                                                        </Typography>
                                                      </CardContent>
                                                    </Card>
                                                  </TableCell>
                                                </>
                                              );
                                            })}

                                          <TableCell>
                                            {orders.is_cancelled == false &&
                                              orders.is_accepted == false && (
                                                <Fab
                                                  variant="extended"
                                                  sx={{ bgcolor: "red" }}
                                                  onClick={()=>cancelledOrder(orders.id)}
                                                >
                                                  cancel
                                                </Fab>
                                              )}
                                          </TableCell>
                                          <TableCell>
                                            <Fab
                                              variant="extended"
                                              sx={{ bgcolor: "salmon" }}
                                            >
                                              {orders.is_accepted == false
                                                ? "waiting.."
                                                : "accepted"}
                                            </Fab>
                                          </TableCell>
                                          <TableCell>
                                            {orders.is_delivered ? (
                                              <></>
                                            ) : (
                                              <Fab
                                                variant="extended"
                                                onClick={() =>
                                                  delivered(orders.id)
                                                }
                                              >
                                                delivery
                                              </Fab>
                                            )}
                                          </TableCell>
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
        </TableHead>
      </TableContainer>
      {/* {orderdlist?.map((ele) => {
        return (
          <> */}

      {/* <Card
              sx={{
                ...style,
                backgroundImage:
                  'url("https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-simple-recipe-menu-design-psd-background-map-image_133527.jpg")',
              }}
            >
              <CardContent>
                <Typography sx={{ marginLeft: "5px" }}>
                  {ele.is_cancelled == false ? (
                    <></>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginTop: "20px" }}
                    >
                      sorry cancelled
                    </Button>
                  )}
                  {ele.is_accepted == true && ele.is_cancelled == false ? (
                    <>
                     
                      <Button variant="contained" color="success">
                        your order is confirmed
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                  <br />
                  {ele.is_accepted == false && ele.is_cancelled == false && (
                    <>
                      <Button variant="contained" color="secondary" onClick={()=>cancelledOrder(ele.id)}>
                        cancel
                      </Button>
                      <br />
                      <Button variant="contained" color="info">
                        waiting for confirmation
                      </Button>
                    </>
                  )}
                  <h3> cart Id</h3>
                  {ele.cart.map((el) => {
                    return food
                      ?.filter((foo) => foo.id === el)
                      ?.map((el) => {
                        return (
                          <>
                            <p>{el.id}</p>

                            <p>{el.resname}</p>
                          </>
                        );
                      });
                  })}

                  {ele.is_delivered==false && ele.is_accepted==true ?
                  <Button variant="contained" color="info" onClick={()=>delivered(ele.id)}>is delivered</Button>:<></>}

                </Typography>
              </CardContent>
            </Card> */}
    </>
    //   );
    // })}
    // </>
  );
}
