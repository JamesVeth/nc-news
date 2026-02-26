import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ArticleList.css";

export default function ArticleList({ articles }) {
  const { slug } = useParams();

  const filteredArticles = slug
    ? articles.filter(article => article.topic === slug)
    : articles;

  return (
    <div className="article-list">
      {filteredArticles.map(article => (
        <Link
          key={article.article_id}
          to={`/article/${article.article_id}`}
          className="article-card"
        >
          <img
            src={article.article_img_url || "/placeholder.png"}
            alt={article.title}
            className="thumbnail"
          />
          <div className="content">
            <h2>{article.title}</h2>
            <p className="meta">
              by {article.author} | {article.topic} | {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p>{article.body.slice(0, 120)}...</p>
            <p className="stats">
              👍 {article.votes ?? 0} | 💬 {article.comment_count ?? 0}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}