import {
  AppBar,
  Avatar,
  Button,
  Card,
  fabClasses,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Restaurent from "../food delivery/restaurent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { TryRounded } from "@mui/icons-material";
import baseUrl from "../base/baseurl";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apidata,setApidata]=useState([])
  const token = localStorage.getItem("token");
  const [admin, setAdmin] = useState(false);
  const [addpost, setAddpost] = useState(false);
  const [create, setCreate] = useState(false);
  const [out, setOut] = useState(false);
  const [foodlist, setFoodlist] = useState(false);
  const [restaurant, setRestaurent] = useState(false);
  const [cart, setCart] = useState(false);
  const [orderlist, setOrderlist] = useState(false);
  const [customerActive, setCustomerActive] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [report, setReport] = useState(false);
  const admins = "8efb6f05f1a84f8eab9a0a77fb589a5c288a2561";
  const username=localStorage.getItem("username")

  
    const checkData = () => {
      axios
        .get(baseUrl("/profile/"), {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Token ${admins}`,
          },
        })
        .then((response) =>setApidata (response.data))
        .catch((error) => console.log(error));
    };



  const fetch = () => {
    navigate("/register");
  };
  const fetch1 = (data) => {
    navigate(`/${data}`);
  };
  const logout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  useEffect(() => {
    checkData()
    switch (location.pathname) {
      case "/cusreg":
        setAdmin(false);
        setAddpost(false);
        setCreate(false);
        setCart(false);
        setOrderlist(false);
        setCustomerActive(false);
        setDelivered(false);
        setReport(false);
        break;
      case "/cuslogin":
        setAdmin(false);
        setAddpost(false);
        setCreate(false);
        setCart(false);
        setOrderlist(false);
        setCustomerActive(false);
        setDelivered(false);
        setReport(false);
        break;
      case "/cuslogin/restaurents":
        setAddpost(false);
        setCreate(false);
        setAdmin(false);
        setCart(false);
        setOrderlist(false);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);
        break;
      case "/cuslogin/foodlist":
        setAddpost(false);
        setCreate(false);
        setAdmin(false);
        setFoodlist(true);
        setRestaurent(true);
        setCart(true);
        setOut(true);
        setOrderlist(false);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);

        break;
      case "/managerpost":
        setCreate(true);
        setAdmin(false);
        setAddpost(true);
        setRestaurent(false);
        setFoodlist(false);
        setOut(true);
        setOrderlist(true);
        setCustomerActive(false);
        setDelivered(false);
        setReport(TryRounded);
        break;
      case "/createfood":
        console.log(location.pathname);
        setCreate(true);
        setAdmin(false);
        setAddpost(true);
        setFoodlist(false);
        setRestaurent(false);
        setOut(true);
        setOrderlist(true);
        setCustomerActive(false);
        setDelivered(false);
        setReport(true);
        break;
      case "/customerdeliveredorders":
        setAddpost(false);
        setCreate(false);
        setAdmin(false);
        setFoodlist(true);
        setRestaurent(true);
        setCart(true);
        setOut(true);
        setOrderlist(false);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);
        break;

      case "/cuslogin/restaurants":
        setCreate(false);
        setAdmin(false);
        setAddpost(false);
        setOut(true);
        setFoodlist(true);
        setRestaurent(true);
        setCart(true);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);

        break;
      case "/orderfood":
        setAdmin(false);
        setFoodlist(true);
        setRestaurent(true);
        setOut(true);
        setCart(true);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);
        break;
      case "/orderlist":
        setCreate(true);
        setAdmin(false);
        setAddpost(true);
        setFoodlist(false);
        setRestaurent(false);
        setOut(true);
        setOrderlist(true);
        setCustomerActive(false);
        setDelivered(false);
        setReport(false);
        break;

      case "/customerorderlist":
        setCreate(false);
        setAdmin(false);
        setAddpost(false);
        setOut(true);
        setFoodlist(true);
        setRestaurent(true);
        setCart(true);
        setCustomerActive(true);
        setDelivered(true);
        setReport(false);

      case "/managerdelivered":
        setCreate(true);
        setAdmin(false);
        setAddpost(true);
        setFoodlist(false);
        setRestaurent(false);
        setOut(true);
        setOrderlist(true);
        setCustomerActive(false);
        setDelivered(false);
        setReport(true);
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/cusreg" &&
      location.pathname !== "/cuslogin" ? (
        <AppBar sx={{ bgcolor: "black", height: "100px" }}>
          <Toolbar>
            <Typography>
              {admin && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch()}
                >
                  Admin
                </Button>
              )}
              &nbsp;
              {addpost && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("managerpost")}
                >
                  Add post
                </Button>
              )}
              &nbsp;
              {create && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("createfood")}
                >
                  createfood
                </Button>
              )}
              &nbsp; &nbsp;
              {token !== "" ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("login")}
                >
                  Login
                </Button>
              )}
              &nbsp; &nbsp;
              {foodlist && (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => fetch1("cuslogin/foodlist")}
                  >
                    foodlist
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => fetch1("orderfood")}
                  >
                    cart details
                  </Button>
                </>
              )}
              &nbsp; &nbsp;
              {restaurant && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("cuslogin/restaurants")}
                >
                  restaurantlist
                </Button>
              )}
              {orderlist && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("orderlist")}
                >
                  active orders
                </Button>
              )}
              {customerActive && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("customerorderlist")}
                >
                  customer active orders
                </Button>
              )}
              {delivered && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("customerdeliveredorders")}
                >
                  deliveredorders
                </Button>
              )}
              {report && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => fetch1("managerdelivered")}
                >
                  deliveredorders
                </Button>
              )}
              {apidata?.filter((el)=>el.username==username)?.map((el)=>{
                return(
                  <>
                   <Avatar sx={{marginLeft:"1600px"}}>{el.username}</Avatar>
                  </>
                )
              })}
          
             
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
    </>
  );
}
