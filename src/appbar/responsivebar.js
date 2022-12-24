import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import RamenDiningIcon from '@mui/icons-material/RamenDining';

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Restaurent from "../food delivery/restaurent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { TryRounded } from "@mui/icons-material";
import baseUrl from "../base/baseurl";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apidata, setApidata] = useState([]);
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
  const username = localStorage.getItem("username");
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const checkData = () => {
    axios
      .get(baseUrl("/profile/"), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Token ${admins}`,
        },
      })
      .then((response) => setApidata(response.data))
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
    checkData();
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
        setReport(true);
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
        setReport(true);
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
        setOrderlist(false);
        break;

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
      break;

     case "customerdeliveredorders":
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
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/" &&
      location.pathname !== "/cusreg" &&
      location.pathname !== "/cuslogin" ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
               < RamenDiningIcon  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,fontSize:"50px", marginLeft:"-250px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           FOOD
          </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {admin && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch()}
                  >
                    Admin
                  </Button>
                )}
                &nbsp;
                {addpost && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("managerpost")}
                  >
                    Add post
                  </Button>
                )}
                &nbsp;
                {create && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("createfood")}
                  >
                    createfood
                  </Button>
                )}
                &nbsp; &nbsp;
                {token !== "" ? (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
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
                      sx={{ my: 2, color: "white", display: "block" }}
                      size="large"
                      onClick={() => fetch1("cuslogin/foodlist")}
                    >
                      foodlist
                    </Button>
                    <Button
                      sx={{ my: 2, color: "white", display: "block" }}
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
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("cuslogin/restaurants")}
                  >
                    restaurantlist
                  </Button>
                )}
                {orderlist && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("orderlist")}
                  >
                    active orders
                  </Button>
                )}
                {customerActive && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("customerorderlist")}
                  >
                    customer active orders
                  </Button>
                )}
                {delivered && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    size="large"
                    onClick={() => fetch1("customerdeliveredorders")}
                  >
                    deliveredorders
                  </Button>
                )}
                {report && (
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                    color="secondary"
                    size="large"
                    onClick={() => fetch1("managerdelivered")}
                  >
                    deliveredorders
                  </Button>
                )}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={() => logout()} >{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <></>
      )}
    </>
  );
}
export default ResponsiveAppBar;
