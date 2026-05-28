import { useState, useEffect } from "react";
import {
    createBook as createBookRepository,
    deleteBook,
    getBooks,
    updateBook,
} from "../repositories/bookRepository";

export function useBooks() {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBooks() {
            try {
                const books = await getBooks();
                setLivros(books);
            } catch (error) {
                console.error("Erro ao carregar livros:", error);
            } finally {
                setLoading(false);
            }
        }
        loadBooks();
    }, []); 


    async function adicionarLivro(novoLivro) {
        const livroCriado = await createBookRepository(novoLivro);

        setLivros((prev) => [...prev, livroCriado]);
    }

    async function removerLivro(id) {
        await deleteBook(id);

        setLivros((prev) => prev.filter((livro) => livro.id !== id));

    }

    async function editarLivro(livroAtualizado) {
        await updateBook(livroAtualizado);

        setLivros((prev) =>
         prev.map((livro) =>
            livro.id === livroAtualizado.id ? livroAtualizado : livro
        )
     );
    }

    return {
        livros,
        loading,
        adicionarLivro,
        removerLivro,
        editarLivro
    };
}