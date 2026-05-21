export function bookCoverAccessibilityLabel(titulo) {
    return `Capa do livro ${titulo}`;
}

export function bookDetailAccessibilityLabel(titulo, autor) {
    return 'Ver detalhes do livro ${titulo}';
}

export function bookEditAccessibilityLabel(titulo) {
    return 'Editar livro ${titulo}';
}

export function bookRemoveAccessibilityLabel(titulo) {
    return 'Remover livro ${titulo}';
}

export function bookAvailabilityText(disponivel) {
    return disponivel ? 'Disponível' : 'Indisponível';
}