const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books;
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(`
      SELECT * FROM authors`);
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(`
      SELECT authors.*,
      COALESCE(json_agg(to_jsonb(books))
      FILTER (WHERE books.id IS NOT NULL), '[]')
      AS books from authors
      LEFT JOIN book_author on authors.id = book_author.author_id
      LEFT JOIN books on book_author.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`, [id]);

    return new Author(rows[0]);
  }
}

module.exports = { Author };

