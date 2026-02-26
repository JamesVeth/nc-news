import React from "react";
import "./CommentList.css";

export default function CommentList({ comments, users, setComments }) {

  const handleCommentVote = (id, delta) => {
    // Update UI instantly
    setComments(prev =>
      prev.map(c => c.comment_id === id ? { ...c, votes: c.votes + delta } : c)
    );

    // Optional: send to backend
    fetch(`https://back-end-nc-news-mc0k.onrender.com/api/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inc_votes: delta }),
    }).catch(err => console.error(err));
  };

  return (
    <div className="comments">
      <h3>Comments ({comments.length})</h3>
      {comments.map(comment => {
        const user = users.find(u => u.username === comment.author);
        return (
          <div key={comment.comment_id} className="comment">
            {user && <img src={user.avatar_url} alt={user.username} className="avatar"/>}
            <div>
              <p className="author">{user ? user.name : comment.author}</p>
              <p>{comment.body}</p>
              <div className="comment-votes">
                <button onClick={() => handleCommentVote(comment.comment_id, 1)}>👍</button>
                <span>{comment.votes}</span>
                <button onClick={() => handleCommentVote(comment.comment_id, -1)}>👎</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}