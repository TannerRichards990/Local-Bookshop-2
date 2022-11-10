const pool = require('../utils/pool');
class Book {

  id;
  title;
  released;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors;
  }

  static async getAllBooks() {
    const { rows } = await pool.query(`
      SELECT * FROM books`);
    return rows.map((book) => new Book(book));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(`
      SELECT books.*,
      COALESCE(json_agg(to_jsonb(authors))
      FILTER (WHERE authors.id IS NOT NULL), '[]')
      AS authors from books
      LEFT JOIN book_author on books.id = book_author.book_id
      LEFT JOIN authors on book_author.author_id = authors.id
      WHERE books.id = $1
      GROUP BY books.id`, [id]);
    return new Book(rows[0]);
  }

}

module.exports = { Book };
