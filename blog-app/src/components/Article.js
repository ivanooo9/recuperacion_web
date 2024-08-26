import React, { useState } from 'react';

const Article = ({ article, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(article.title);
    const [editedContent, setEditedContent] = useState(article.content);
    const [editedAuthor, setEditedAuthor] = useState(article.author);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updatedArticle = {
            title: editedTitle,
            content: editedContent,
            author: editedAuthor
        };

        try {
            const response = await fetch(`http://localhost:5000/articles/${article._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedArticle)
            });

            if (response.ok) {
                const updatedArticleData = await response.json();
                onEdit(article._id, updatedArticleData);
                setIsEditing(false);
            } else {
                console.error('Error al actualizar el artículo');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/articles/${article._id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                onDelete(article._id);
            } else {
                console.error('Error al eliminar el artículo');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editedAuthor}
                        onChange={(e) => setEditedAuthor(e.target.value)}
                    />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <p><strong>{article.author}</strong></p>
                    <button onClick={handleEdit}>Editar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            )}
        </div>
    );
};

export default Article;
