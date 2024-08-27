
import React, { useState } from 'react';

const ArticleForm = ({ onArticleCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const newArticle = {
            title,
            content,
            author
        };


        const response = await fetch('http://localhost:5000/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
        });

        if (response.ok) {
            const createdArticle = await response.json();
            onArticleCreated(createdArticle); 
            setTitle('');  
            setContent('');
            setAuthor('');
        } else {
            console.error('Error al crear el artículo');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <button type="submit">Crear Artículo</button>
        </form>
    );
};

export default ArticleForm;
