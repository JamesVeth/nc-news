import React, { useState } from "react";
import "./CommentForm.css";

export default function CommentForm({ articleId, loggedInUser, setComments }) {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const newComment = {
      comment_id: Date.now(),
      author: loggedInUser,
      article_id: articleId,
      body: text,
      votes: 0,
      created_at: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment..." required/>
      <button type="submit">Submit</button>
    </form>
  );
}