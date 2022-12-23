import { Box, Card, Modal, Typography } from "@mui/material";
import React, { useState } from "react";


export default function Modalcomponent({ open, handleClose, modalValue }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
 
  return (
    <>
      <Modal open={open} onClose={handleClose} hideBackdrop>
        <Box sx={style}>
          {modalValue}
        </Box>
      </Modal>
    </>
  );
}
