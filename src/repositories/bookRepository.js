import { getDatabase } from "../database/database.js";


export async function getBooks() {
  const db = await getDatabase();

  const books = await db.getAllAsync("SELECT * FROM books");
  
  return books.map((book) => ({
    ...book,
    id: String(book.id),
    disponivel: book.disponivel === 1,
  }));
}

export async function createBook(book) {
  const db = await getDatabase();

  const result = await db.runAsync(
    `
    INSERT INTO books (titulo, autor, ano, capa, disponivel)
    VALUES (?, ?, ?, ?, ?);
    `,
    [
      book.titulo,
      book.autor,
      book.ano,
      book.capa,
      book.disponivel ? 1 : 0,
    ]
  );
  
  return {
    ...book,
    id: String(result.lastInsertRowId),
  };
}

export async function updateBook(book) {
  const db = await getDatabase();

  await db.runAsync(
    `
    UPDATE books
    SET titulo = ?, autor = ?, ano = ?, capa = ?, disponivel = ?
    WHERE id = ?;
    `,
    [ 
      book.titulo,
      book.autor,
      book.ano,
      book.capa,
      book.disponivel ? 1 : 0,
      Number(book.id),
    ]
  );  

  return book;
}
export async function deleteBook(id) {
  const db = await getDatabase();

  await db.runAsync("DELETE FROM books WHERE id = ?", [Number(id)]);
}

