import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ topics }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">NC News</NavLink>
      <div className="topics">
        <NavLink to="/" className={({ isActive }) => isActive ? "active-topic" : ""}>
          All
        </NavLink>
        {topics.map(topic => (
          <NavLink
            key={topic.slug}
            to={`/topic/${topic.slug}`}
            className={({ isActive }) => isActive ? "active-topic" : ""}
          >
            {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}