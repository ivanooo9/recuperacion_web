// articleModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del artículo
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Crear el modelo basado en el esquema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
