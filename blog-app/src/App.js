import React, { useState, useEffect } from 'react';
import Header from './components/header';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';

function App() {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        const response = await fetch('http://localhost:5000/articles');
        const data = await response.json();
        setArticles(data);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleArticleCreated = (newArticle) => {
        setArticles([...articles, newArticle]);
    };

    const handleArticleEdited = (id, updatedArticle) => {
        setArticles(articles.map(article => 
            article._id === id ? updatedArticle : article
        ));
    };

    const handleArticleDeleted = (id) => {
        setArticles(articles.filter(article => article._id !== id));
    };

    return (
        <div className="App">
            <Header />
            <ArticleForm onArticleCreated={handleArticleCreated} />
            <ArticleList 
                articles={articles} 
                onEdit={handleArticleEdited} 
                onDelete={handleArticleDeleted} 
            />
        </div>
    );
}

export default App;
