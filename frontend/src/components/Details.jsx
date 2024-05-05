import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Logo from "../assets/logo.png";

const Details = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | {Blog Name}";
  }, []);

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="left">
          <div className="heading">
            <p className="tag">
              <i className="fa fa-tag"></i> Lifestyle
            </p>
            <div className="title">100 Days at the Library: Intro</div>
            <div className="details">
              <span>
                <img
                  src="https://dummyimage.com/500x600/000/fff"
                  alt=""
                  srcset=""
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </span>
              <span style={{ marginLeft: "1rem" }}>Steph Lawson</span> | Feb 12,
              2024
            </div>
          </div>

          <div className="content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              cumque, voluptates, quas, quod doloremque quae voluptatum
              laboriosam repudiandae tempora quos dolorem. Quisquam, quod
              voluptate. Quisquam, quod voluptate. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione.
            </p>

            <img src={Logo} alt="" srcset="" />

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              cumque, voluptates, quas, quod doloremque quae voluptatum
              laboriosam repudiandae tempora quos dolorem. Quisquam, quod
              voluptate. Quisquam, quod voluptate. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione.
            </p>

            <img src={Logo} alt="" srcset="" />

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              cumque, voluptates, quas, quod doloremque quae voluptatum
              laboriosam repudiandae tempora quos dolorem. Quisquam, quod
              voluptate. Quisquam, quod voluptate. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Consequatur expedita consequuntur
              possimus est voluptates nesciunt impedit, adipisci iusto
              voluptatem eligendi eum autem necessitatibus dolor sint esse.
              Provident, culpa. Dolores, ratione.
            </p>
          </div>
        </div>

        <div className="right">
          <div className="right-top">
            <div className="votes">
              <p>100</p>
              <i className="fa fa-thumbs-up"></i>
            </div>
            <div className="votes">
              <p>100</p>
              <i className="fa fa-thumbs-down"></i>
            </div>
          </div>

          <div className="right-bottom">
            <div className="comment-display">
              <div className="comment">
                <p>Sudip Sigdel</p>
                <p>Comment</p>
                <div className="comment-task">
                  <p>
                    <i className="fa fa-thumbs-up"> 1</i>
                  </p>

                  <p>
                    <i className="fa fa-thumbs-down"> 3</i>
                  </p>

                  <p>
                    <i className="fa fa-edit"></i>
                  </p>

                  <p>
                    <i className="fa fa-trash"></i>
                  </p>

                  <p>
                    <i className="fa fa-clock"></i>
                  </p>
                </div>
              </div>
              <div className="comment">
                <p>Sudip Sigdel</p>
                <p>Comment</p>
                <div className="comment-task">
                  <p>
                    <i className="fa fa-thumbs-up"> 1</i>
                  </p>

                  <p>
                    <i className="fa fa-thumbs-down"> 3</i>
                  </p>

                  <p>
                    <i className="fa fa-edit"></i>
                  </p>

                  <p>
                    <i className="fa fa-trash"></i>
                  </p>

                  <p>
                    <i className="fa fa-clock"></i>
                  </p>
                </div>
              </div>
              <div className="comment">
                <p>Sudip Sigdel</p>
                <p>Comment</p>
                <div className="comment-task">
                  <p>
                    <i className="fa fa-thumbs-up"> 1</i>
                  </p>

                  <p>
                    <i className="fa fa-thumbs-down"> 3</i>
                  </p>

                  <p>
                    <i className="fa fa-edit"></i>
                  </p>

                  <p>
                    <i className="fa fa-trash"></i>
                  </p>

                  <p>
                    <i className="fa fa-clock"></i>
                  </p>
                </div>
              </div>
              <div className="comment">
                <p>Sudip Sigdel</p>
                <p>Comment</p>
                <div className="comment-task">
                  <p>
                    <i className="fa fa-thumbs-up"> 1</i>
                  </p>

                  <p>
                    <i className="fa fa-thumbs-down"> 3</i>
                  </p>

                  <p>
                    <i className="fa fa-edit"></i>
                  </p>

                  <p>
                    <i className="fa fa-trash"></i>
                  </p>

                  <p>
                    <i className="fa fa-clock"></i>
                  </p>
                </div>
              </div>
              <div className="comment">
                <p>Sudip Sigdel</p>
                <p>Comment</p>
                <div className="comment-task">
                  <p>
                    <i className="fa fa-thumbs-up"> 1</i>
                  </p>

                  <p>
                    <i className="fa fa-thumbs-down"> 3</i>
                  </p>

                  <p>
                    <i className="fa fa-edit"></i>
                  </p>

                  <p>
                    <i className="fa fa-trash"></i>
                  </p>

                  <p>
                    <i className="fa fa-clock"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <input type="text" placeholder="Add a comment" />
            <button>Comment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
