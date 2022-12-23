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

export default function Deliveredlist() {
  const [delivered, setDelivered] = useState();
  const [card, setCard] = useState();
  const [food, setFood] = useState();
  const [reslist, setReslist] = useState();
  const token = localStorage.getItem("token");
  var options = { year: "numeric", month: "long", day: "numeric" };

  const formatDate = (string) => {
    return new Date(string).toLocaleDateString([], options);
  };

  const loadData = () => {
    axios
      .get(baseUrl("customer/deliveredorders/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setDelivered(res.data))
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
      .then((response) => setCard(response.data))
      .catch((error) => console.log(error));
  };
  const foodlist = () => {
    axios
      .get(baseUrl("/food/"))
      .then((response) => setFood(response.data))
      .catch((error) => console.log(error));
  };

  const restaurant = () => {
    axios
      .get(baseUrl("restaurant/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setReslist(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
    cartList();
    foodlist();
    restaurant();
  }, []);

  return (
    <>
      <TableContainer sx={{ marginLeft: "500px", maxWidth: "800px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>food</TableCell>
              <TableCell></TableCell>
              <TableCell>details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {delivered?.map((element) => {
              return (
                <>
                  <br />
                  <br />
                  <br />

                  {element.cart?.map((el) => {
                    return (
                      <>
                        {card
                          ?.filter((datas) => datas.id == el)
                          .map((det) => {
                            return (
                              <>
                                {food
                                  ?.filter((list) => list.id == det.food)
                                  .map((del) => {
                                    return (
                                      <>
                                        <TableRow>
                                          <TableCell>
                                            <CardMedia
                                              component="img"
                                              height="100"
                                              width="100"
                                              image={del.image}
                                              sx={{
                                                borderRadius: "10%",
                                                maxWidth: "200px",
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <h4>food details</h4>
                                            {del.name.toUpperCase()}
                                            <Typography>
                                              Rs.{del.price}
                                            </Typography>
                                            {reslist
                                              ?.filter(
                                                (res) =>
                                                  res.id == del.restaurant
                                              )
                                              .map((dt) => {
                                                return (
                                                  <>
                                                    <Typography>
                                                      {dt.address.toUpperCase()}
                                                    </Typography>
                                                  </>
                                                );
                                              })}
                                          </TableCell>
                                          <TableCell>DELIVERED</TableCell>
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

                  <br />
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

