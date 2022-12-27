import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modalcomponent from "../modal/modalcomponent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import baseUrl from "../base/baseurl";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box } from "@mui/system";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Orderfood() {
  const [data, setData] = useState();
  const [edit, setEdit] = useState({ quantity: "", name: "", food: "" });
  console.log("datas", data);
  const token = JSON.parse(localStorage.getItem("token"));
  const [details, setDetails] = useState({ note: "" });
  const [food, setFood] = useState([]);
  const [foodlist, setFoodlist] = useState();
  const [check, setCheck] = useState({});
  const [editView, setEditView] = useState(false);
  const [cartId, setCartId] = useState();
  const [price, setPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = (det) => {
    setOpen(true);
    setFood([det.id]);
  };

  const editData = (quantity, name, food, details, id) => {
    setCheck(details);
    setCartId(id);
    setEdit({ quantity: quantity, name: name, food: food });
    setEditView(true);
    console.log("det", cartId);
  };
  console.log(edit);

  const handleClose = () => {
    setEditView(false);

    setOpen(false);
  };
  const style = {
    float: "left",
    display: "flex",
    marginTop: "100px",
    margin: "200px",
    width: "405px",
    height: "400px",
    textAlign: "center",
    marginLeft: "400px",
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
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  const total = data?.reduce(
    (total, current) => (total = total + current.price),
    0
  );

  const loadData = () => {
    axios
      .get(baseUrl("/food/"),{
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => setFoodlist(response.data))
      .catch((error) => console.log(error));
  };

  const postData = () => {
    const body = { note: details.note, cart: food };
    axios
      .post(baseUrl("/customer/neworder/"), body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const deleteCart = (id) => {
    console.log("id", id);
    axios
      .delete(baseUrl(`cart/${id}/`), {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })

      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const handleChangeEdit = (e) => {
    setEdit({ name: edit.name, food: edit.food, quantity: e.target.value });
  };

  const putEditdata = () => {
    axios
      .put(baseUrl(`/cart/${cartId}/`), edit, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => cartData(), []);
  useEffect(() => loadData(), []);

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
          marginLeft: "300px",
          marginTop: "50px",
        }}
      >
        My FAVOURITE CART
      </Typography>

      <TableContainer sx={{ marginLeft: "1600px", maxWidth: "400px" }}>
        ORDER SUMMARY
        <Card sx={{ height: "300px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TOTAL DETAILS</TableCell>
                <TableCell>price</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>DELIVERY CHARGE</TableCell>
                <TableCell>50</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>SUBTOTAL</TableCell>

                <TableCell>{total}+50</TableCell>
              </TableRow>
              <hr />
              <TableRow>
                <TableCell>TOTAL</TableCell>
                <TableCell>{total + 50}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </TableContainer>
      <TableContainer
        sx={{ marginLeft: "400px", maxWidth: "1000px", marginTop: "-300px" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "rgb(157, 223, 240)", border: "2" }}>
            <TableRow>
              <TableCell>S.NO</TableCell>
              <TableCell>Products</TableCell>
              <TableCell></TableCell>
              <TableCell>price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>ordernow</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((card, index) => {
              return (
                <>
                  {foodlist?.filter((details) => details.id == card.food)
                    ?.map((el) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell
                              style={{ maxWidth: "100px", height: "300px" }}
                            >
                              <Card sx={{ maxWidth: "250px" }}>
                                <CardMedia
                                  component="img"
                                  height="150"
                                  width="100"
                                  image={el.image}
                                />
                              </Card>
                            </TableCell>
                            <TableCell>
                              <Typography sx={{ marginTop: "-1px" }}>
                                <h3>FOOD DETAILS</h3>
                                <Typography>{el.name.toUpperCase()}</Typography>
                                <Typography>RS.{el.price}</Typography>
                                <Typography>SPICY AND DELICIOUS </Typography>
                                ADDRESS:
                                <Typography>
                                  {card.resname
                                    .slice(4, card.resname.length - 1)
                                    .toUpperCase()}
                                </Typography>
                                <br />
                                <Button
                                  color="success"
                                  onClick={() =>
                                    editData(
                                      card.quantity,
                                      el.name,
                                      el.id,

                                      el,
                                      card.id
                                    )
                                  }
                                >
                                  <BorderColorIcon />
                                  EDit
                                </Button>
                                <Button color="warning">
                                  <HighlightOffIcon
                                    onClick={() => deleteCart(card.id)}
                                  />
                                  remove
                                </Button>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography>RS.{el.price}</Typography>
                            </TableCell>

                            <TableCell>{card.quantity}</TableCell>
                            <TableCell>
                              {" "}
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleOpen(card)}
                              >
                                order now!
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </>
              );
            })}
            <Modalcomponent
              open={open}
              handleClose={handleClose}
              modalValue={
                <>
                  <>
                    <TextField name="note" onChange={handleChange}></TextField>
                    <Button onClick={postData}>ordernow</Button>
                  </>
                </>
              }
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editView} onClose={handleClose} hideBackdrop>
        <Box sx={styles} onMouseLeave={handleClose}>
          <CardMedia
            component="img"
            height="200"
            width="50"
            image={check?.image}
          />
          <Typography>{check?.name}</Typography>
          <Typography>Rs.{check?.price}</Typography>
          <br />
          <br />
          <TextField value={edit.quantity} onChange={handleChangeEdit} />
          <Button onClick={() => putEditdata()}>edit</Button>
          <br />
          <br />
        </Box>
      </Modal>
    </>
  );
}
