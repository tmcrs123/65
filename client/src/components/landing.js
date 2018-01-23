import React, { Component } from "react";
import { connect } from "react-redux";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import StarBorder from "material-ui/svg-icons/toggle/star-border";
import images from "../resources/images";
import palmtree from "../resources/palmTree.png";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    const styles = {
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
      },
      gridList: {
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto"
      },
      tile: {
        rows: 2,
        cols: 1
      }
    };

    return (
      <div style={{ overflowX: "hidden" }}>
        <div
          className="container-fluid center-align"
          style={{
            height: "700px",
            backgroundColor: "#EDECEC",
            padding: "72px 24px 72px 24px"
          }}
        >
          <img src={palmtree} height={"300px"} />
          <h1 style={{ fontWeight: 300 }}>65</h1>
          <h2 style={{ fontWeight: 100 }}>Your holiday apartment</h2>
        </div>

        <div className="container-fluid center-align">
          <p
            className="flow-text"
            style={{
              margin: "80px 400px 80px 400px",
              textJustify: "kashida"
            }}
          >
            Bacon ipsum dolor amet cow ribeye pork loin sirloin porchetta beef
            ground round kevin pork brisket biltong. Porchetta jerky pork loin
            ball tip, t-bone pork belly meatloaf landjaeger fatback picanha
            meatball swine sirloin turducken.
          </p>
        </div>
        <div className="container-fluid" />

        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {images.map((image, index) => (
              <GridTile
                key={index}
                rows={styles.tile.rows}
                cols={styles.tile.cols}
              >
                <img src={image} />
              </GridTile>
            ))}
          </GridList>
        </div>

        <div className="container-fluid center-align">
          <p
            className="flow-text"
            style={{
              margin: "80px 400px 0px 400px",
              textJustify: "kashida"
            }}
          >
            Interested? Click here and book your stay today!
          </p>
          <Link to="/customer/login">
            <RaisedButton
              primary={true}
              label="Get Started"
              style={{ marginTop: "20px", marginBottom: "80px" }}
            />
          </Link>
        </div>
        <div
          className="center-align"
          style={{ height: "150px", backgroundColor: "#262626" }}
        >
          <p
            className="flow-text"
            style={{ paddingTop: "20px", color: "#EDECEC" }}
          >
            Handcrafted by Tiago Rodrigues
          </p>
          <a href="https://github.com/tmcrs123">
            <i
              className="fa fa-github fa-3x"
              style={{ color: "#EDECEC" }}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;
