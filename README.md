# appBooks

Aplicativo mobile para gerenciamento simples de livros, desenvolvido com React Native e Expo. O projeto permite cadastrar, listar, visualizar detalhes, editar e remover livros, com persistencia local usando SQLite.

## Sobre o Projeto

O appBooks foi desenvolvido com fins academicos para praticar conceitos de desenvolvimento mobile, navegacao entre telas, componentes reutilizaveis, hooks, organizacao por camadas, acessibilidade e armazenamento local.

A aplicacao simula um pequeno sistema de biblioteca. Cada livro possui titulo, autor, ano de publicacao, URL da capa e informacao de disponibilidade.

## Funcionalidades

- Listagem de livros cadastrados
- Cadastro de novos livros
- Visualizacao dos detalhes de um livro
- Edicao de livros existentes
- Remocao de livros
- Controle de disponibilidade
- Persistencia local com SQLite
- Melhorias de acessibilidade em botoes, imagens e campos de formulario
- Contraste visual na tela de cadastro e edicao

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

3. Abra o app em um emulador Android/iOS ou em um dispositivo fisico usando o Expo Go.

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
    |-- constants/
    |   `-- colors.js
    |-- database/
    |   `-- database.js
    |-- hooks/
    |   `-- useBooks.js
    |-- models/
    |   `-- bookModel.js
    |-- navigation/
    |   `-- AppNavigator.js
    |-- repositories/
    |   `-- bookRepository.js
    |-- screens/
    |   |-- HomeScreen.js
    |   |-- DetailsScreen.js
    |   `-- FormScreen.js
    |-- services/
    |   `-- bookService.js
    `-- utils/
        `-- accessibility.js
```

## Principais Arquivos

- `index.js`: registra o componente principal do app no Expo.
- `App.js`: inicializa o banco SQLite e exibe a navegacao quando o banco esta pronto.
- `src/navigation/AppNavigator.js`: configura as rotas `Home`, `Details` e `Form`.
- `src/screens/HomeScreen.js`: tela inicial com a listagem dos livros e botao de cadastro.
- `src/screens/DetailsScreen.js`: tela de detalhes, edicao e remocao do livro selecionado.
- `src/screens/FormScreen.js`: tela usada para cadastrar e editar livros.
- `src/components/BookItem.js`: componente reutilizavel que exibe um livro na lista.
- `src/hooks/useBooks.js`: hook responsavel por carregar, adicionar, editar e remover livros no estado da aplicacao.
- `src/repositories/bookRepository.js`: camada que executa as operacoes de leitura e escrita no SQLite.
- `src/database/database.js`: abre a conexao com SQLite e cria a tabela inicial.
- `src/constants/colors.js`: centraliza as cores usadas no app.
- `src/utils/accessibility.js`: centraliza textos auxiliares para acessibilidade.
- `src/models/bookModel.js`: define o formato padrao de um objeto livro.
- `src/services/bookService.js`: camada reservada para normalizacao e validacao dos dados dos livros.

## Fluxo da Aplicacao

```text
index.js
-> App.js
-> AppNavigator.js
-> HomeScreen.js
-> useBooks.js
-> bookRepository.js
-> database.js
-> SQLite
```

O `App.js` chama `initDatabase()` ao iniciar. Essa funcao abre o banco local e cria a tabela `books`, caso ela ainda nao exista.

Depois que o banco esta pronto, o app renderiza o `AppNavigator`, que controla as telas principais.

## Persistencia com SQLite

Os dados dos livros sao salvos localmente no banco:

```text
appbooks.db
```

A tabela principal se chama:

```text
books
```

Ela armazena:

- `id`: identificador unico do livro
- `titulo`: titulo do livro
- `autor`: autor do livro
- `ano`: ano de publicacao
- `capa`: URL da imagem da capa
- `disponivel`: disponibilidade do livro

No SQLite, a disponibilidade e salva como numero:

```text
1 = disponivel
0 = indisponivel
```

Ao buscar os dados, o repository converte esse valor para booleano em JavaScript:

```js
disponivel: book.disponivel === 1
```

## Arquitetura

O projeto usa uma organizacao por camadas:

- `screens`: telas completas acessadas pela navegacao.
- `components`: partes visuais reutilizaveis.
- `hooks`: logica de estado e integracao com repository.
- `repositories`: acesso aos dados persistidos.
- `database`: configuracao e conexao SQLite.
- `services`: regras auxiliares, validacao e normalizacao.
- `models`: formato padrao dos dados.
- `utils`: funcoes auxiliares.
- `constants`: valores fixos reutilizaveis.
- `navigation`: configuracao de rotas.

Essa separacao evita que as telas fiquem responsaveis por tudo. A tela exibe a interface, o hook controla o estado, o repository acessa o banco e o database configura o SQLite.

## Acessibilidade

O app possui propriedades de acessibilidade em pontos importantes:

- `accessibilityLabel`: descreve imagens, campos e botoes.
- `accessibilityHint`: explica o que acontece ao acionar um botao.
- `accessibilityRole`: informa o papel do elemento, como `button`.
- `accessible={false}` e `importantForAccessibility="no"`: usados em imagens de fundo decorativas.

Exemplo:

```js
accessibilityRole="button"
accessibilityLabel="Salvar livro"
accessibilityHint="Pressione para salvar as informacoes do livro"
```

## Interface e Contraste

A tela de cadastro e edicao usa uma imagem de fundo com uma camada escura semitransparente sobre o formulario. Isso melhora a leitura dos textos e campos.

As cores principais ficam centralizadas em:

```text
src/constants/colors.js
```

Exemplo:

```js
colors.primary
colors.white
colors.overlay
colors.inputBackground
```

## Observacoes

A pasta `app/` existe por causa do template do Expo, mas a entrada principal configurada no `package.json` e:

```text
index.js
```

Portanto, o fluxo principal usado pelo app e:

```text
index.js -> App.js -> src/navigation/AppNavigator.js
```

## Status

Projeto academico em desenvolvimento, com base preparada para evoluir com novas funcionalidades, como busca de livros, filtros, categorias, validacao visual de formulario e sincronizacao com API externa.
