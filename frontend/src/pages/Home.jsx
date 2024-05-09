import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../assets/post.png";

const Home = () => {
  useEffect(() => {
    document.title = "ABS3 BLOG";
  }, []);

  const [blogList, setBlogList] = useState([]);
  const [sort, setSort] = useState("random");

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

  const listLatest = async () => {
    let response = await fetch("https://localhost:7124/api/Blog/BlogsRecency", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let latestBlogs = await response.json();

    if (latestBlogs.length > 0) {
      setBlogList(latestBlogs);
    }
  };

  const listOldest = async () => {
    let response = await fetch("https://localhost:7124/api/Blog/OldestBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let oldestBlogs = await response.json();

    if (oldestBlogs.length > 0) {
      setBlogList(oldestBlogs);
    }
  };

  const listPopular = async () => {
    let response = await fetch("https://localhost:7124/api/Blog/BlogsPopular", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let popularBlogs = await response.json();

    if (popularBlogs.length > 0) {
      setBlogList(popularBlogs);
    }
  };

  const listRandom = async () => {
    let response = await fetch("https://localhost:7124/api/Blog/RandomBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let randomBlogs = await response.json();

    if (randomBlogs.length > 0) {
      setBlogList(randomBlogs);
    }
  };

  useEffect(() => {
    listBlogs();
  }, []);

  console.log(blogList);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
          <div className="sort">
            <span>Sort By: </span>
            <select
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                if (e.target.value === "all") {
                  listBlogs();
                }
                if (e.target.value === "latest") {
                  listLatest();
                } else if (e.target.value === "oldest") {
                  listOldest();
                } else if (e.target.value === "popular") {
                  listPopular();
                } else if (e.target.value === "random") {
                  listRandom();
                }
              }}
            >
              <option value="random">Random</option>
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="all">All</option>
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
                  {blog.image && (
                    <span>
                      <img
                        src={`https://localhost:7124/${blog.image.slice(
                          blog.image.indexOf("uploads")
                        )}`}
                        alt=""
                        srcSet=""
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%", backgroundSize: "cover" }}
                      />
                    </span>
                  )}
                  <span style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                    {blog.userName}
                  </span>

                  {blog.createdAt.slice(0, 16).replace("T", " ")}
                </div>
              </div>

              <div className="content">
                <p>{blog.content.slice(0, 150) + " ..."}</p>
              </div>

              <div className="see-more">
                <a href={`/details/${blog.id}`}>See more</a>
              </div>
            </div>
            <div className="right">
              <img
                src={`https://localhost:7124/${blog.imagePath.slice(
                  blog.imagePath.indexOf("uploads")
                )}`}
                alt=""
              />
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
