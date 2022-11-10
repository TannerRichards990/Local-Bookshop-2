const { Router } = require('express');
const { Author } = require('../models/authorModel');
module.exports = Router()

  .get('/:id', async (req, res) => {
    const singleAuthor = await Author.getAuthorById(req.params.id);
    res.json(singleAuthor);
  })

  .get('/', async (req, res) => {
    const authors = await Author.getAllAuthors();
    res.json(authors);
  });
