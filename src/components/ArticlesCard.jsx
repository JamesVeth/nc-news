import { Link } from "react-router-dom";
import "./ArticlesCard.css";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <div className="col-left">
        <span className="topic-box">{article.topic}</span>

        <Link to={`/article/${article.article_id}`}>
          <h3>{article.title}</h3>
        </Link>

        <p>
          By {article.author},{" "}
          {new Date(article.created_at).toLocaleDateString()}
        </p>

        <p>
          👍 {article.votes ?? 0} Likes | 💬 {article.comment_count ?? 0} Comments
        </p>
      </div>

      <div className="col-right">
        <img
          src={article.article_img_url || "/placeholder.png"}
          alt={article.title}
          className="thumb"
        />
      </div>
    </div>
  );
}