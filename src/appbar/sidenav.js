import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useLocation, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import RamenDiningTwoToneIcon from "@mui/icons-material/RamenDiningTwoTone";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import baseUrl from "../base/baseurl";
import Person2TwoToneIcon from "@mui/icons-material/Person2TwoTone";
import Playground from "./auto";
import LogoutIcon from "@mui/icons-material/Logout";
import ResetPassword from "../customer/resetpassword";

const drawerWidth = 280;

export default function PermanentDrawerLeft() {
  const location = useLocation();
  const admins = "8efb6f05f1a84f8eab9a0a77fb589a5c288a2561";
  const [view, setView] = useState(false);
  const manager = ["orderlist", "managerdelivered", "createfood"];
  const customer = ["foodlist", ""];
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const [apidata, setApidata] = useState([]);

  const fetch = (text) => {
    navigate(`${text}`);
  };

  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser((prevState) => !prevState);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
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

  const logout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  const viewSetting = () => {
    setView(true);
  };

  useEffect(() => checkData(), []);

  return (
    <>
      {location.pathname !== "/login" &&
      location.pathname !== "/" &&
      location.pathname !== "/cusreg" ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              //   backgroundColor:"#5A575B"
              backgroundColor: "#ccf8fc",
            }}
          >
            <Toolbar>
              <RamenDiningTwoToneIcon color="primary" />
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
                }}
              >
                ENJOY YOUR MEAL
              </Typography>

              <Box sx={{ flexGrow: 0, marginLeft: "1000px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {apidata
                      ?.filter((el) => el.username == username)
                      ?.map((el, index) => {
                        return (
                          <>
                            <Avatar
                              alt="Remy Sharp"
                              src="/static/images/avatar/2.jpg"
                              sx={{ bgcolor: "black" }}
                            >
                              <Person2TwoToneIcon />
                            </Avatar>
                            <Typography>{el.username}</Typography>

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
                              open={anchorElUser}
                              onClose={handleCloseUserMenu}
                            >
                              <MenuItem
                                key={index}
                                onClick={() => handleCloseUserMenu()}
                              >
                                <Card sx={{ maxWidth: "200px" }}>
                                  <CardContent>
                                    <Button
                                      onClick={() => handleCloseUserMenu()}
                                    >
                                      close
                                    </Button>
                                    <Typography textAlign="center">
                                      {el.username}
                                    </Typography>
                                    <Typography>
                                      {el.profile?.address}
                                    </Typography>
                                    <Typography>
                                      {el.profile?.is_manager == true ? (
                                        "manager"
                                      ) : (
                                        <></>
                                      )}
                                    </Typography>
                                    <br />
                                    <Fab
                                      variant="extended"
                                      sx={{ bgcolor: "salmon" }}
                                      onClick={viewSetting}
                                    >
                                      Reset password
                                    </Fab>
                                    <br />
                                    <br />
                                  </CardContent>
                                </Card>
                              </MenuItem>
                            </Menu>
                          </>
                        );
                      })}
                  </IconButton>
                </Tooltip>
                &nbsp;
                <Button onClick={() => logout()}>
                  {" "}
                  <LogoutIcon color="secondary" />
                  Logout
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                // backgroundColor:"#5A575B"
                backgroundColor: "#ccf8fc",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            {location.pathname == "/createfood" ||
            location.pathname == "/postfood" ||
            location.pathname == "/orderlist" ||
            location.pathname == "/managerdelivered" ||
            location.pathname == "/managerpost" ? (
              <>
                <List>
                  {manager.map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          onClick={() => fetch(text)}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <>
                <Typography sx={{ textAlign: "justify" }}>
                  <ListItem>
                    <Button
                      color="inherit"
                      onClick={() => fetch("/cuslogin/restaurants")}
                    >
                      {" "}
                      <RestaurantIcon /> restaurant{" "}
                    </Button>
                    <Divider />
                    <br />
                  </ListItem>
                  <ListItem>
                    <Button
                      color="inherit"
                      onClick={() => fetch("/cuslogin/foodlist")}
                    >
                      {" "}
                      <FastfoodIcon /> foodlist{" "}
                    </Button>
                    <Divider />
                    <br />
                  </ListItem>
                  <ListItem>
                    <Button color="inherit" onClick={() => fetch("/orderfood")}>
                      <RamenDiningTwoToneIcon /> orderfood
                    </Button>
                    <Divider />
                    <br />
                  </ListItem>
                  <ListItem>
                    <Button
                      color="inherit"
                      onClick={() => fetch("/customerdeliveredorders")}
                    >
                      <DeliveryDiningIcon /> deliveredorders
                    </Button>
                    <Divider />
                    <br />
                  </ListItem>
                  <ListItem>
                    <Button
                      color="secondary"
                      onClick={() => fetch("/customerorderlist")}
                    >
                      <InfoIcon />
                      delivering info
                    </Button>
                    <Divider />
                    <br />
                  </ListItem>
                </Typography>
              </>
            )}

            <Divider />
          </Drawer>

          <Toolbar />
        </Box>
      ) : (
        <></>
      )}
      {view && <ResetPassword />}
    </>
  );
}
