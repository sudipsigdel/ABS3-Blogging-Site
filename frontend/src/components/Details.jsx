import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../assets/logo.png";

const Details = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | {Blog Name}";
  }, []);

  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      let blogApi = await fetch(`https://localhost:7124/api/Blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let blog = await blogApi.json();

      if (blog) {
        setBlog(blog[0]);
      }
    };

    getBlog();
  }, []);

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="left">
          <div className="heading">
            <p className="tag">
              <i className="fa fa-tag"></i> {blog.category}
            </p>
            <div className="title">{blog.title}</div>
            <div className="details">
              <span>
                <img
                  src="https://dummyimage.com/500x600/000/fff"
                  alt=""
                  srcSet=""
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </span>
              <span style={{ marginLeft: "1rem" }}>{blog.userId}</span> |{" "}
              {new Date(blog.createdAt)
                .toISOString()
                .split(".")[0]
                .replace("T", " ")}
            </div>
          </div>

          <div className="content">
            <p>{blog.content}</p>

            <img src={blog.imagePath} alt="" srcSet="" />
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
