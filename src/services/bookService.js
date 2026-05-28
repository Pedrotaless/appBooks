import { createBook } from "../models/bookModel";

export function normalizeBook(book) {
    return createBook({
        id: book.id,
        title: book.titulo?.trim() || "",
        autor: book.autor?.trim() || "",
        ano: book.ano || null,
        capa: book.capa?.trim() || "",
        disponivel: Boolean(book.disponivel),
    });
}

export function validatebook(book) {
    const errors = [];

    if (!book.titulo?.trim()) {
        errors.push("O título é obrigatório.");
    }

    if (!book.autor?.trim()) {
        errors.push("O autor é obrigatório.");
    }   

    if (!book.ano?.trim()) {
        errors.push("O ano é obrigatório.");
    }

      return errors;
}         

