import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../assets/post.png";
import Logo from "../assets/logo.png";

const Home = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG";
  }, []);

  const [blogList, setBlogList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const listBlogs = async () => {
    let blogApi = await fetch("https://localhost:7124/api/Blog/GetBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let blogs = await blogApi.json();

    if (blogs.length > 0) {
      setBlogList(blogs);
    }
  };

  useEffect(() => {
    listBlogs();
  }, []);

  console.log(blogList);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar />

      <div className="post">
        <a href="/post">
          <img src={Post} alt="" width={30} />
        </a>
      </div>

      <div className="home-container">
        <div className="heading-top">
          <div className="filter">
            <span>Category: </span>
            <select name="filter" id="filter">
              <option value="all">All</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="tech">Tech</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div className="sort">
            <span>Sort By: </span>
            <select name="sort" id="sort">
              <option value="random" defaultChecked>
                Random
              </option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {currentPosts.map((blog) => (
          <div className="contain" key={blog.id}>
            <div className="left">
              <div className="heading">
                <p className="tag">
                  <i className="fa fa-tag"></i> {blog.category}
                </p>
                <div className="title">{blog.title}</div>
                <div className="details">
                  <span style={{ marginLeft: "1rem" }}>{blog.userId}</span> |{" "}
                  {new Date(blog.createdAt)
                    .toISOString()
                    .split(".")[0]
                    .replace("T", " ")}
                </div>
              </div>

              <div className="content">
                <p>{blog.content}</p>
              </div>

              <div className="see-more">
                <a href={`/details/${blog.id}`}>See more</a>
              </div>
            </div>
            <div className="right">
              <img src={blog.imagePath} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= blogList.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
