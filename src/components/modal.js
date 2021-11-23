import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { ScaleLoader as Loader } from "react-spinners";
import { css } from "@emotion/react";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

export default function BasicModal(props) {
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const renderImage = async () => {
    console.log(props.quality_url);
    setImg(
      <>
        {props.quality_url != undefined ? (
          <div style={{ textAlign: "center" }}>
            <img
              src={props.quality_url}
              style={{
                height: 400,
                position: "relative",
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,.1)"
              }}
              onClick={() => {
                window.open(props.quality_url, "_blank");
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <ImageNotSupportedIcon />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    renderImage();
  }, []);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ position: "relative" }}>
          {img ? (
            img
          ) : (
            <>
              <Loader loading={loading} size={150} />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
