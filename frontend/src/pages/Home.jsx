import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../assets/post.png";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="post">
        <a href="/post">
          <img src={Post} alt="" width={30}/>
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
              <option value="random" defaultChecked>Random</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="contain">
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
                <span style={{ marginLeft: "1rem" }}>Steph Lawson</span> | Feb
                12, 2024
              </div>
            </div>

            <div className="content">
              <p>
                A good thing about being a woman in my late thirties is that,
                back in 1991, I was the perfect age to take in Disney’s Beauty
                and the Beast when it first hit the big screen. The film left
                quite an impression on me, and no part more than when Belle
                first sees the library that Beast has built for her. The room
                itself is vast and spacious, with high vaulted ceilings, shelves
                upon shelves of books that require ladders to reach, and where
                ladders won’t do, magnificently ornate spiral staircases — the
                stuff a 5-year-old girl’s dreams are made of. We understand that
                the library is Belle’s happy place — a refuge wherein she can
                escape the realities of everyday life and get lost in the
                magical world that is storytelling.
              </p>
            </div>

            <div className="see-more">
              <a href="/details">See More</a>
            </div>
          </div>
          <div className="right">
            <img src="https://dummyimage.com/500x600/000/fff" alt="" />
          </div>
        </div>

        <div className="contain">
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
                <span style={{ marginLeft: "1rem" }}>Steph Lawson</span> | Feb
                12, 2024
              </div>
            </div>

            <div className="content">
              <p>
                A good thing about being a woman in my late thirties is that,
                back in 1991, I was the perfect age to take in Disney’s Beauty
                and the Beast when it first hit the big screen. The film left
                quite an impression on me, and no part more than when Belle
                first sees the library that Beast has built for her. The room
                itself is vast and spacious, with high vaulted ceilings, shelves
                upon shelves of books that require ladders to reach, and where
                ladders won’t do, magnificently ornate spiral staircases — the
                stuff a 5-year-old girl’s dreams are made of. We understand that
                the library is Belle’s happy place — a refuge wherein she can
                escape the realities of everyday life and get lost in the
                magical world that is storytelling.
              </p>
            </div>

            <div className="see-more">
              <a href="/details">See More</a>
            </div>
          </div>
          <div className="right">
            <img src="https://dummyimage.com/500x600/000/fff" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
