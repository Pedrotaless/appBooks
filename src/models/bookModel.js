export function createBookModel({
    id,
    titulo = "",
    autor = "",
    ano = "",
    capa = "",
    disponivel = true,
}) {
    return {
        id,
        titulo,
        autor,
        ano,
        capa,
        disponivel
    };
} 