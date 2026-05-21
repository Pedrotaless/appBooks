import { createBook } from "../models/bookModel";

export function createNewBook(novoLivro) {
    return createBook({
        ...novoLivro,
        id: String(id),
    });


export function updateBook(livros, livroAtualizado) {
    return livros.map((livro) => 
        livro.id === livroAtualizado.id ? livroAtualizado : livro
    );
}

export function removeBookFromList(livros, id) {
    return livros.filter((livro) => livro.id !== id);

}

export default bookService;