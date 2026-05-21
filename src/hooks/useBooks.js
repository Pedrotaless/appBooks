import { useRef, useState } from "react";
import { getInitialBooks } from "../repositories/bookRepository";
import { createNewBook, removeBookFromList, updateBookList } from "../services/bookService";

export function useBooks() {
    const [livros, setLivros] = useState(getInitialBooks());
    const proximoId = useRef(4);

    function adicionarLivro(novoLivro) {
        const livroComId = createNewBook(novoLivro, proximoId.current);

        proximoId.current += 1;

        setLivros((prev) => [...prev, livroComId]);
    }

    function removerLivro(id) {
        setLivros((prev) => removeBookFromList(prev, id));

    }

    function editarLivro(livroAtualizado) {
        setLivros((prev) => updateBookList(prev, livroAtualizado));
    }

    return {
        livros,
        adicionarLivro,
        removerLivro,
        editarLivro
    };
}