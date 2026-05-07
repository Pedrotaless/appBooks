import * as SQLite from "expo-sqlite";

let database;

const livrosIniciais = [
  {
    titulo: "Entendendo Algoritmos",
    autor: "Aditya Y. Bhargava",
    ano: "2017",
    disponivel: true,
    capa: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SY342_.jpg",
  },
  {
    titulo: "Codigo Limpo: Habilidades Praticas do Agile Software",
    autor: "Robert C. Martin",
    ano: "2009",
    disponivel: false,
    capa: "https://m.media-amazon.com/images/I/71dH97FwGbL._SY342_.jpg",
  },
  {
    titulo: "JavaScript: O Guia Definitivo",
    autor: "David Flanagan",
    ano: "2012",
    disponivel: true,
    capa: "https://m.media-amazon.com/images/I/816vDdUauOL._SY342_.jpg",
  },
];

async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("AppBooks.db");
  }

  return database;
}

function mapLivro(row) {
  return {
    ...row,
    id: String(row.id),
    disponivel: Boolean(row.disponivel),
  };
}

export async function iniciarBanco() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS livros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      autor TEXT NOT NULL,
      ano TEXT NOT NULL,
      disponivel INTEGER NOT NULL,
      capa TEXT
    );
  `);

  const resultado = await db.getFirstAsync("SELECT COUNT(*) AS total FROM livros;");

  if (resultado.total === 0) {
    for (const livro of livrosIniciais) {
      await inserirLivro(livro);
    }
  }
}

export async function listarLivros() {
  const db = await getDatabase();
  const livros = await db.getAllAsync("SELECT * FROM livros ORDER BY id;");

  return livros.map(mapLivro);
}

export async function inserirLivro(livro) {
  const db = await getDatabase();
  const resultado = await db.runAsync(
    `INSERT INTO livros (titulo, autor, ano, disponivel, capa)
     VALUES (?, ?, ?, ?, ?);`,
    livro.titulo,
    livro.autor,
    livro.ano,
    livro.disponivel ? 1 : 0,
    livro.capa
  );

  return {
    ...livro,
    id: String(resultado.lastInsertRowId),
  };
}

export async function atualizarLivro(livro) {
  const db = await getDatabase();

  await db.runAsync(
    `UPDATE livros
     SET titulo = ?, autor = ?, ano = ?, disponivel = ?, capa = ?
     WHERE id = ?;`,
    livro.titulo,
    livro.autor,
    livro.ano,
    livro.disponivel ? 1 : 0,
    livro.capa,
    Number(livro.id)
  );

  return livro;
}

export async function excluirLivro(id) {
  const db = await getDatabase();

  await db.runAsync("DELETE FROM livros WHERE id = ?;", Number(id));
}
