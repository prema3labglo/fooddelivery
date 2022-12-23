import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Modalcomponent from "../modal/modalcomponent";
import Orderfood from "./orderfood";
import { useNavigate } from "react-router-dom";
import baseUrl from "../base/baseurl";
import Playground from "../appbar/auto";
import { Stack } from "@mui/system";
import { Search } from "@mui/icons-material";

export default function FoodList() {
  const [foodlist, setFoodlist] = useState();
  const [ord, setOrd] = useState(false);
  const [datas, setDatas] = useState([]);
  const [quant, setQuant] = useState(1);
  const [view, setView] = useState(false);
  const [value, setValue] = useState();
  const [word, setWord] = useState("");
  const [list,setList]=useState()
  const [store, setStore] = useState({
    quantity: quant,
    price: "",
    food: "",
  });
  const fetch = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (food) => {
    setOpen(true);
    setList(food)
    console.log("food",food)
  };
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");

  const order = () => {
    fetch("/orderfood");
  };

  const style = {
    float: "left",
    display: "flex",
    marginTop: "110px",
    margin: "50px",
    width: "500px",
    height: "400px",
    backgroundColor: "#5c5958",
    // backgroundColor: "white",
    marginLeft: "700px",
  };
  const quantity = () => {
    setQuant(quant + 1);
  };
  const subQuantity = () => {
    console.log(quant);
    setQuant(Math.max(quant - 1, 0));
  };

  const cart = (id, price) => {
    console.log(quant);
    const body = { quantity: quant, price: price, food: id };
    axios
      .post(baseUrl("/cart/"), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    setQuant(1);
  };
  const cartData = () => {
    axios
      .get(baseUrl("/cart/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setDatas(response.data))
      .catch((error) => console.log(error));
  };
  console.log("data", datas);

  console.log("det", store);

  const loadData = () => {
    axios
      .get(baseUrl("/food/"))
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error));
  };
  const handleView = () => {};

  useEffect(() => loadData(), []);

  useEffect(() => cartData(), []);

  return (
    <div className="food">
      <br />
      <br />
      <br />

      <Button
        color="inherit"
        variant="contained"
        sx={{ marginTop: "-20px", marginLeft: "1400px" }}
      >
        <AddShoppingCartIcon onClick={order} />
        {datas?.length}
      </Button>
      {/* <Stack spacing={1} sx={{ width: 400 }}>
        <Autocomplete
          sx={{
            marginRight: "-800px",
            marginTop: "-100px",
            marginLeft: "900px",
          }}
          {...defaultProps}
          id="disable-close-on-select"
          renderInput={(params) => <TextField {...params} label="searchfood" />}
        />
      </Stack>
      <IconButton onClick={() => filterData(value)}>
        <AddShoppingCartIcon />
      </IconButton>
      <br />
      <br /> */}

      {foodlist?.map((food) => {
        return (
          <>
            <center>
              <Card
                sx={{
                  ...style,
                  maxWidth: "500px",
                  marginLeft: "300px",
                  borderRadius: "5%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="200"
                  image={food.image}
                  sx={{ marginLeft: "50px" }}
                />
                <br />
                <br />
                <CardContent>
                  <Typography
                    sx={{
                      marginTop: "220px",
                      marginLeft: "-459px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Typography></Typography>
                    <Typography variant="h5">{food.name}</Typography>
                    <Typography>price{food.price}</Typography>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography
                    sx={{
                      marginTop: "340px",
                      marginLeft: "-480px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {datas
                      ?.filter((el) => el.food == food.id)
                      .filter((el, index) => 0 == index)
                      .map((el) => {
                        return (
                          <>
                            <Button
                              variant="contained"
                              color="inherit"
                              sx={{ color: "black" }}
                            >
                              order now
                            </Button>
                          </>
                        );
                      })}
                  </Typography>
                  <Typography
                    sx={{
                      marginTop: "340px",
                      marginRight: "-300px",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={()=>handleOpen(food)}
                    >
                      add to favourits
                    </Button>
                    <Modalcomponent
                      open={open}
                      handleClose={handleClose}
                      modalValue={
                        <>
                        <Card sx={{maxWidth:"450px"}}>
                          <CardMedia
                            component="img"
                            height="200"
                            width="150"
                            image={list?.image}
                            sx={{ marginLeft: "50px" }}
                          />
                          <Typography sx={{marginTop:"20px",marginLeft:"60px"}}>{list?.name}</Typography>
                          <Typography sx={{marginTop:"20px",marginLeft:"60px"}}>Rs.{list?.price}</Typography>
                          <br/>
                          <CardActions   sx={{marginLeft:"20px"}}>
                          Quantity:<Button
                        
                            color="secondary"
                            variant="contained"
                            onClick={quantity}
                          >
                            +
                          </Button>
                          &nbsp;
                          {quant}
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={subQuantity}
                          >
                            -
                          </Button>
                          <Button 
                            variant="contained"
                            onClick={() => cart(list.id,list.price)}
                          >
                            <AddShoppingCartIcon />
                            add to cart
                          </Button>

                         
                          </CardActions>
                          </Card>
                        </>
                       
                      }
                    />
                  </Typography>
                </CardActions>
              </Card>
            </center>
          </>
        );
      })}
    </div>
  );
}
