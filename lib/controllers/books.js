const { Router } = require('express');
const { Book } = require('../models/bookModel');
module.exports = Router()

  .get('/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    res.json(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    res.json(books);
  });
