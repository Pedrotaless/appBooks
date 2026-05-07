# appBooks

Aplicativo mobile para gerenciamento simples de livros, desenvolvido com React Native e Expo. O projeto permite listar, cadastrar, editar, remover e visualizar detalhes de livros, com persistencia local usando SQLite.

## Sobre o Projeto

O appBooks foi criado com fins academicos para praticar conceitos iniciais de desenvolvimento mobile, navegacao entre telas, componentes reutilizaveis, estados no React e armazenamento local.

A aplicacao simula um pequeno sistema de biblioteca. Cada livro possui titulo, autor, ano, URL da capa e informacao de disponibilidade.

## Funcionalidades

- Listagem de livros cadastrados
- Visualizacao dos detalhes de um livro
- Cadastro de novos livros
- Edicao de livros existentes
- Remocao de livros
- Controle de disponibilidade
- Persistencia local dos dados com SQLite

## Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- React Navigation
- Expo SQLite
- Node.js

## Como Executar

Antes de iniciar, tenha o Node.js instalado na maquina.

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm start
```

ou:

```bash
npx expo start
```

3. Abra o app em um emulador Android/iOS ou no dispositivo fisico usando o Expo Go.

## Scripts Disponiveis

```bash
npm start
```

Inicia o servidor de desenvolvimento do Expo.

```bash
npm run android
```

Inicia o projeto no Android.

```bash
npm run ios
```

Inicia o projeto no iOS.

```bash
npm run web
```

Inicia o projeto no navegador.

```bash
npm run lint
```

Executa a verificacao de lint do projeto.

## Estrutura do Projeto

```text
appBooks/
|-- App.js
|-- index.js
|-- package.json
|-- app/
|-- assets/
`-- src/
    |-- components/
    |   `-- BookItem.js
    |-- screens/
    |   |-- HomeScreen.js
    |   |-- DetailsScreen.js
    |   `-- FormSreens.js
    `-- storage/
        `-- database.js
```

## Principais Arquivos

- `index.js`: registra o componente principal do app no Expo.
- `App.js`: configura a navegacao entre as telas.
- `src/screens/HomeScreen.js`: tela inicial com a listagem dos livros.
- `src/screens/DetailsScreen.js`: tela de detalhes do livro selecionado.
- `src/screens/FormSreens.js`: tela usada para adicionar e editar livros.
- `src/components/BookItem.js`: componente que exibe cada livro na lista.
- `src/storage/database.js`: camada responsavel pela criacao da tabela e operacoes com SQLite.

## Persistencia com SQLite

Os dados dos livros sao salvos localmente no banco `AppBooks.db`, usando `expo-sqlite`.

A tabela principal se chama `livros` e armazena:

- `id`: identificador unico do livro
- `titulo`: titulo do livro
- `autor`: autor do livro
- `ano`: ano da publicacao
- `disponivel`: disponibilidade do livro
- `capa`: URL da imagem da capa

Quando o banco esta vazio, o app cria uma lista inicial de livros para demonstracao.

## Observacoes

A pasta `app/` existe no projeto por causa do template do Expo, mas a entrada principal atual esta configurada em `package.json` como `index.js`. Portanto, o fluxo usado pelo app e:

```text
index.js -> App.js -> src/screens
```

## Status

Projeto em desenvolvimento academico, com foco em aprendizado e pratica de conceitos de React Native, Expo e SQLite.
