import React from 'react';
import Article from './Article';

const ArticleList = ({ articles, onEdit, onDelete }) => {
    return (
        <div>
            {articles.map(article => (
                <Article 
                    key={article._id} 
                    article={article} 
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ArticleList;
