import "../styles.css";
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ScaleLoader as Loader } from "react-spinners";
import { css } from "@emotion/react";
import "../style.css";
import Modal from "../components/modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function MainList() {
  const [postsLength, setPostsLength] = useState();
  const [imgs, setImgs] = useState(<></>);
  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = useState();
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  const [quality_url, setQualityUrl] = useState("");
  const [search, setSearch] = useState("");

  function highResolution(item) {
    let image = item.image;
    console.log(image);

    let url;
    console.log(item.sample);
    if (item.sample == 1) {
      url = `https://us.rule34.xxx//samples/${item.directory}/sample_${image}?${item.id}`;
      url = url.replace(".png", ".jpg");
      url = url.replace(".jpeg", ".jpg");
    } else {
      url = `https://us.rule34.xxx//images/${item.directory}/${image}?${item.id}`;
    }

    console.log(url);
    return url;
  }

  const handleOpen = async (item) => {
    let high_img = await highResolution(item);
    setQualityUrl(high_img);
    setOpen(true);
  };
  const handleClose = () => {
    setQualityUrl(null);
    setOpen(false);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const R34 = async () => {
    await api.get("/r34/posts-length").then((response) => {
      if (response) {
        console.log(response.data.posts);
        setPostsLength(response.data.posts);
      }
    });

    await api.get(`/r34/posts`).then(async (response) => {
      console.log(response.data.posts);
      let posts_data = response.data.posts;
      let cont = 0;

      const imgData = await posts_data.map((item, index) => {
        cont++;
        if (cont === 1000 && loading === true) {
          setLoading(false);
        }
        return (
          <>
            <div
              key={`img-nsfw-${index}`}
              id={`img-nsfw-${index}`}
              className="picture-hnt"
            >
              <img
                onClick={() => {
                  handleOpen(item);
                }}
                src={item.preview_url}
              />
            </div>
          </>
        );
      });
      if (loading === false) {
        setImgs(imgData);
      }
    });
  };

  useEffect(() => {
    R34();
  }, [loading]);

  const handleSearch = (value) => {
    setSearch(value);
  };
  const handleQueryTags = () => {
    console.log(search);
    setImgs("");

    api.get(`/r34/search?tags=${search}`).then(async (response) => {
      if (response.data.posts != "") {
        let posts_data = response.data.posts;
        let cont = 0;

        const imgData = await posts_data.map((item, index) => {
          return (
            <>
              <div
                key={`img-nsfw-${index}`}
                id={`img-nsfw-${index}`}
                className="picture-hnt"
              >
                <img
                  onClick={() => {
                    handleOpen(item);
                  }}
                  src={item.preview_url}
                />
              </div>
            </>
          );
        });
        setImgs(imgData);
      } else {
        setImgs(<h4>Tags not found</h4>);
      }
    });
  };
  const handleRandomQuery = () => {
    const randId = Math.floor(Math.random() * postsLength + 1);

    api.get(`/r34/find-id/${randId}`).then(async (response) => {
      if (response) {
        console.log(response.data.posts[0]);
        if (response.data.posts[0] != "") {
          handleOpen(response.data.posts[0]);
        } else {
          alert("Random Image not found");
        }

        // ;
      }
    });
  };

  return (
    <>
      {open ? (
        <>
          {" "}
          <Modal
            open={open}
            handleClose={handleClose}
            quality_url={quality_url}
          />
        </>
      ) : (
        <></>
      )}
      <div className="App">
        <h1> Quackão</h1>
        <code style={{ textAlign: "center", marginBottom: 15 }}>
          ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
          ⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⣩⣭⣶⣶⣮⣭⡙⠿⣿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⠿⣋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡙⢿⣿⣿⣿
          ⣿⣿⣿⣿⣿⡃⠄⠹⡿⣿⣿⣿⣿⠟⠛⣿⣿⣿⣿⣷⡌⢿⣿⣿ ⣿⣿⣿⣿⣿⠐⣠⡶⣶⣲⡎⢻⣿⣤⣴⣾⣿⣿⣿⣿⣿⠸⣿⣿
          ⣿⠟⣋⡥⡶⣞⡯⣟⣾⣺⢽⡧⣥⣭⣉⢻⣿⣿⣿⣿⣿⣆⢻⣿ ⡃⣾⢯⢿⢽⣫⡯⣷⣳⢯⡯⠯⠷⠻⠞⣼⣿⣿⣿⣿⣿⣿⡌⣿
          ⣦⣍⡙⠫⠛⠕⣋⡓⠭⣡⢶⠗⣡⣶⡝⣿⣿⣿⣿⣿⣿⣿⣧⢹ ⣿⣿⣿⣿⣿⣿⣘⣛⣋⣡⣵⣾⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸
          ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸ ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⢸
        </code>
        <div style={{ textAlign: "center" }}>
          <img
            style={{
              marginTop: 30,
              width: 300,
              borderRadius: 400,
              boxShadow: "1px 1px 2px 3px rgba(0,0,0,.2)"
            }}
            src="https://i.pinimg.com/736x/6e/fa/91/6efa91222dd374e5aa3fc58e056e2d11.jpg"
          />
        </div>
        <>
          <TextField
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            label="Tags"
            variant="outlined"
          />{" "}
          <Button
            variant="contained"
            onClick={() => {
              handleQueryTags();
            }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleRandomQuery();
            }}
          >
            Random
          </Button>
          <h2>Posts:</h2>{" "}
          <div className="cont-number">
            <h2>{postsLength}</h2>
          </div>
        </>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignContent: "flex-start"
          }}
        >
          {
            loading ? (
              <div style={{ textAlign: "center" }}>
                <Loader
                  color={color}
                  loading={loading}
                  css={override}
                  size={150}
                />
              </div>
            ) : (
              <>{imgs}</>
            ) /*imgs*/
          }
        </div>
      </div>
    </>
  );
}
