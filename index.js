const express = require('express');
const mongoose = require('mongoose');
const Article = require('./articleModel');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando');
});


app.post('/articles', async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear el artículo' });
    }
});


app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los artículos' });
    }
});


app.put('/articles/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ error: 'No se pudo actualizar el artículo' });
    }
});


app.delete('/articles/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ error: 'Artículo no encontrado' });
        }
        res.status(200).json({ message: 'Artículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el artículo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
