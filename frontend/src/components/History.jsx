import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const History = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG | History";
  }, []);

  const { id } = useParams();

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      let blogApi = await fetch(
        `https://localhost:7124/api/Blog/blogedithistory?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let blog = await blogApi.json();

      if (blog) {
        setBlog(blog);
      }
      console.log(blog);
    };
    getBlog();
  }, []);

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div
          className="left"
          style={{ width: "100%" }}
        >
          {blog.map((blog, index) => (
            <>
              <div
                className="heading"
                key={index}
                
              >
                <p className="tag">
                  <i className="fa fa-tag"></i> {blog.category}
                </p>
                <div className="title">{blog.title}</div>
                <div className="details">
                  <i
                    className="fa fa-clock"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  {blog.updatedAt &&
                    blog.updatedAt.slice(0, 16).replace("T", " ")}
                </div>
              </div>

              <div className="content">
                <p>{blog.content}</p>

                {/* {blog.imagePath && (
                  <img
                    src={`https://localhost:7124/${blog.imagePath.slice(
                      blog.imagePath.indexOf("uploads")
                    )}`}
                    alt=""
                  />
                )} */}
              </div>

              <hr />
              <br />
              <br />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
