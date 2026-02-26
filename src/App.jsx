import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import ScrollToTop from "./components/ScrollToTop";
import NavBar from "./components/NavBar";

function App() {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://back-end-nc-news-mc0k.onrender.com/api/topics")
      .then(res => res.json())
      .then(data => setTopics(data.topics));

    fetch("https://back-end-nc-news-mc0k.onrender.com/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data.articles));

    fetch("https://back-end-nc-news-mc0k.onrender.com/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  return (
    <Router>
     <ScrollToTop /> 
      <NavBar topics={topics} />
      <Routes>
        <Route path="/" element={<ArticleList articles={articles} />} />
        <Route path="/topic/:slug" element={<ArticleList articles={articles} />} />
        <Route path="/article/:id" element={<ArticlePage users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;