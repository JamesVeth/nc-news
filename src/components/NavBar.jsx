import React, { useEffect, useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("https://back-end-nc-news-mc0k.onrender.com/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data.topics));
  }, []);

  return (
    <div className="navbar">
      <div className="nav-left">NC News</div>
      <div className="nav-right">
        {topics.map((topic) => (
          <span key={topic.slug} className="nav-topic">
            {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}