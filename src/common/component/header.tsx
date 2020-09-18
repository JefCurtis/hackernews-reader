import React from "react";
import "./header.scss";
import hnImg from "../../images/hacker-news-logo.gif";

const Header = () => {
  return (
    <div className="header">
      <img src={hnImg} alt="Hacker News icon" />
      <a href="https://news.ycombinator.com/news">Hacker News</a>
    </div>
  );
};

export { Header };
