import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./ArticlePage.css";

export default function ArticlePage({ users }) {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const loggedInUser = "tickle122";

  useEffect(() => {
    // Fetch the article
    fetch(`https://back-end-nc-news-mc0k.onrender.com/api/articles`)
      .then(res => res.json())
      .then(data => setArticle(data.articles.find(a => a.article_id === Number(id))));

    // Fetch comments for this article
    fetch(`https://back-end-nc-news-mc0k.onrender.com/api/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments.filter(c => c.article_id === Number(id))));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  // Handle article votes
  const handleArticleVote = (delta) => {
    setArticle(prev => ({ ...prev, votes: prev.votes + delta }));

    // Optional backend PATCH
    fetch(`https://back-end-nc-news-mc0k.onrender.com/api/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inc_votes: delta }),
    }).catch(err => console.error(err));
  };

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p className="meta">
        by {article.author} | {article.topic} | {new Date(article.created_at).toLocaleDateString()}
      </p>
      <div className="vote-buttons">
        <button onClick={() => handleArticleVote(1)}>👍</button>
        <span>{article.votes}</span>
        <button onClick={() => handleArticleVote(-1)}>👎</button>
      </div>
      <img src={article.article_img_url} alt={article.title} className="article-img"/>
      <p className="body">{article.body}</p>
      <CommentList comments={comments} users={users} setComments={setComments} />
      <CommentForm articleId={article.article_id} loggedInUser={loggedInUser} setComments={setComments} />
    </div>
  );
}