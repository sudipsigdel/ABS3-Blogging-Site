import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import swal from "sweetalert";
import { Modal, Box } from "@mui/material";

const Details = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG";
  }, []);

  const navigate = useNavigate();

  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

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
      console.log(blog);
    };
    getBlog();
  }, [refresh]);

  const getComment = async () => {
    let commentAPi = await fetch(`https://localhost:7124/api/Comment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let comment = await commentAPi.json();

    if (commentAPi.status === 200) {
      setListComment(comment);
    }
    console.log(comment);
  };

  useEffect(() => {
    getComment();
  }, [refresh]);

  const handleUpvote = async () => {
    let response = await fetch(`https://localhost:7124/api/Blog/upvote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 200) {
      setRefresh((refresh) => !refresh);
    } else if (response.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
    } else if (response.status === 400) {
      swal("Please remove downvote first", {
        icon: "error",
      });
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleDownvote = async () => {
    let response = await fetch(
      `https://localhost:7124/api/Blog/downvote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      setRefresh((refresh) => !refresh);
    } else if (response.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
    } else if (response.status === 400) {
      swal("Please remove upvote first", {
        icon: "error",
      });
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", comment);
    formData.append("blog", id);

    let response = await fetch(`https://localhost:7124/api/Comment`, {
      method: "POST",
      body: JSON.stringify({ text: comment, blog: id }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      swal("Commented successfully", {
        icon: "success",
      });
      setComment("");
      setRefresh((refresh) => !refresh);
    } else if (response.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
      setComment("");
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleCommentUpvote = async (id) => {
    let response = await fetch(
      `https://localhost:7124/api/Comment/upvote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      setRefresh((refresh) => !refresh);
    } else if (response.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
    } else if (response.status === 400) {
      swal("Please remove downvote first", {
        icon: "error",
      });
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleCommentDownvote = async (id) => {
    let response = await fetch(
      `https://localhost:7124/api/Comment/downvote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      setRefresh((refresh) => !refresh);
    } else if (response.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
    } else if (response.status === 400) {
      swal("Please remove upvote first", {
        icon: "error",
      });
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  const handleCommentEdit = async (comment) => {
    swal("Update your comment", {
      content: {
        element: "input",
        attributes: {
          value: comment.text,
        },
      },
    }).then((value) => {
      if (value) {
        let response = fetch(
          `https://localhost:7124/api/Comment/edit/${comment.id}?commentData=${value}`,
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        window.location.reload();
      }
    });
  };

  const handleCommentDelete = async (id) => {
    let Cresponse = await fetch(`https://localhost:7124/api/Comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (Cresponse.status === 200) {
      swal("Comment deleted successfully", {
        icon: "success",
      });
      setRefresh((refresh) => !refresh);
    } else if (Cresponse.status === 401) {
      swal("You must log in to perform this task", {
        icon: "error",
      });
    } else {
      swal("Something went wrong", {
        icon: "error",
      });
    }
  };

  // Edit History
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    overflow: "scroll",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  const [open, setOpen] = useState(false);
  const [commentHistory, setCommentHistory] = useState([]);

  const handleOpen = (id) => {
    setOpen(true);

    const getComment = async () => {
      let commentAPi = await fetch(
        `https://localhost:7124/api/Comment/commentedithistory?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let comment = await commentAPi.json();

      if (commentAPi.status === 200) {
        setCommentHistory(comment);
      }
      console.log(comment);
    };

    getComment();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">Comment Edit History</h2>

          {commentHistory.map((comment) => (
            <div className="edited-comment" key={comment.id}>
              <p className="comment">{comment.text}</p>

              <i className="fa fa-clock"></i> {
                comment.updatedAt && comment.updatedAt.slice(0, 16).replace("T", " ")
              }
            </div>
          ))}
        </Box>
      </Modal>

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
                {blog.image && (
                  <img
                    src={`https://localhost:7124/${blog.image.slice(
                      blog.image.indexOf("uploads")
                    )}`}
                    alt=""
                    srcSet=""
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </span>
              <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                {blog.userName}
              </span>

              {blog.createdAt && blog.createdAt.slice(0, 16).replace("T", " ")}

              {blog.isEdited === true && (
                <span style={{ marginLeft: "1rem" }}>
                  <i
                    className="fa fa-clock react"
                    onClick={() => {
                      navigate(`/history/${id}`);
                    }}
                  ></i>
                </span>
              )}
            </div>
          </div>

          <div className="content">
            <p>{blog.content}</p>

            {blog.imagePath && (
              <img
                src={`https://localhost:7124/${blog.imagePath.slice(
                  blog.imagePath.indexOf("uploads")
                )}`}
                alt=""
              />
            )}
          </div>
        </div>

        <div className="right">
          <div className="right-top">
            <div className="votes">
              <p>{blog.upVoteCount}</p>
              <i className="fa fa-thumbs-up react" onClick={handleUpvote}></i>
            </div>
            <div className="votes">
              <p>{blog.downVoteCount}</p>
              <i
                className="fa fa-thumbs-down react"
                onClick={handleDownvote}
              ></i>
            </div>
          </div>

          <div className="right-bottom">
            <div className="comment-display">
              {listComment.length === 0 ? (
                <center>"No Comments Yet!"</center>
              ) : (
                listComment.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <p>{comment.user.name}</p>
                    <p>{comment.text}</p>
                    <div className="comment-task">
                      <p>
                        <i
                          className="fa fa-thumbs-up react"
                          onClick={() => handleCommentUpvote(comment.id)}
                        ></i>{" "}
                        {comment.upVoteCount}
                      </p>

                      <p>
                        <i
                          className="fa fa-thumbs-down react"
                          onClick={() => handleCommentDownvote(comment.id)}
                        >
                          {" "}
                        </i>{" "}
                        {comment.downVoteCount}
                      </p>

                      {comment.userId === parseInt(userId) ? (
                        <>
                          <p>
                            <i
                              className="fa fa-edit react"
                              onClick={() => handleCommentEdit(comment)}
                            ></i>
                          </p>
                          <p>
                            <i
                              className="fa fa-trash react"
                              onClick={() => handleCommentDelete(comment.id)}
                            ></i>
                          </p>
                        </>
                      ) : null}

                      {comment.isEdited === true && (
                        <p>
                          <i
                            className="fa fa-clock react"
                            onClick={() => handleOpen(comment.id)}
                          ></i>
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {token && (
            <div className="comment">
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              {comment.length === 0 ? (
                <button disabled>Comment</button>
              ) : (
                <button onClick={handleComment}>Comment</button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
