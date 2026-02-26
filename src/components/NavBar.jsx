import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // ✅ matches file name exactly

export default function NavBar({ topics }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">NC News</Link>
      <div className="topics">
        <Link to="/">All</Link>
        {topics.map(topic => (
          <Link key={topic.slug} to={`/topic/${topic.slug}`}>
            {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
  );
}