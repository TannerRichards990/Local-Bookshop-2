const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { Book } = require('../lib/models/bookModel');
const { Author } = require('../lib/models/authorModel');

describe('test', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books will list out all of the books', async () => {
    const res = await request(app).get('/books');
    const books = await Book.getAllBooks();
    expect(res.body).toEqual(books);
  });

  it('/books1 will list out a single book page', async () => {
    const res = await request(app).get('/books/1');
    const exp = await Book.getBookById(1);
    expect(res.body).toEqual(exp);
  });

  it('/authors will list out all of the authors', async () => {
    const res = await request(app).get('/authors');
    const exp = await Author.getAllAuthors();
    expect(res.body).toEqual(exp);
  });

  it('/authors1 will list out a single author page', async () => {
    const res = await request(app).get('/authors/1');
    const exp = await Author.getAuthorById(1);
    expect(res.body).toEqual(exp);
  });





  afterAll(() => {
    pool.end();
  });
});
