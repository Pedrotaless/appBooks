# Apresentacao da Aplicacao appBooks

## Visao geral

O **appBooks** e uma aplicacao mobile criada com **React Native** e **Expo** para gerenciar uma lista simples de livros. A aplicacao permite cadastrar livros, listar os livros salvos, visualizar os detalhes de um livro, editar suas informacoes e remover registros.

Os dados nao ficam apenas na memoria do aplicativo. Eles sao salvos localmente em um banco SQLite usando a biblioteca `expo-sqlite`, o que permite manter os livros cadastrados mesmo depois que o app e fechado.

De forma geral, o projeto trabalha com tres partes principais:

- **Navegacao**, configurada em `App.js`
- **Telas**, localizadas em `src/screens`
- **Banco de dados**, concentrado em `src/storage/database.js`

## Estrutura principal do projeto

```text
appBooks/
|-- App.js
|-- index.js
|-- package.json
|-- README.md
|-- app/
|   `-- index.tsx
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

## Fluxo inicial da aplicacao

O fluxo usado pelo app comeca em `index.js`.

```text
index.js -> App.js -> telas em src/screens
```

O arquivo `package.json` define que a entrada principal do projeto e:

```json
"main": "index.js"
```

Isso significa que, quando o Expo inicia a aplicacao, ele procura o arquivo `index.js`.

### `index.js`

Esse arquivo importa o `registerRootComponent` do Expo e o componente principal `App`.

```js
import { registerRootComponent } from 'expo';
import App from './App';
```

O `registerRootComponent(App)` registra o componente `App` como raiz da aplicacao. Em outras palavras, ele informa ao Expo qual componente deve ser carregado primeiro.

## Navegacao da aplicacao

### `App.js`

O arquivo `App.js` e responsavel por configurar a navegacao entre as telas.

Imports usados:

- `React`: necessario para criar componentes React.
- `NavigationContainer`: componente que envolve toda a navegacao do aplicativo.
- `createNativeStackNavigator`: cria uma navegacao em pilha, onde uma tela pode abrir outra.
- `HomeScreen`: tela inicial da lista de livros.
- `DetailsScreen`: tela de detalhes de um livro.
- `FormScreen`: tela usada para cadastrar ou editar livros.

O trecho:

```js
const Stack = createNativeStackNavigator();
```

cria o navegador do tipo stack. Esse tipo de navegacao funciona como uma pilha de telas: a tela inicial aparece primeiro, e novas telas sao empilhadas quando o usuario navega.

Dentro de `App`, existem tres rotas:

- `Home`: mostra a lista de livros.
- `Details`: mostra os detalhes de um livro selecionado.
- `Form`: mostra o formulario de cadastro ou edicao.

```text
Home -> Details
Home -> Form
Details -> Form
```

A tela `Home` e a primeira porque aparece como o primeiro `Stack.Screen` dentro do navegador.

## Tela inicial: `HomeScreen.js`

A `HomeScreen` e a tela principal da aplicacao. Ela lista os livros cadastrados, carrega os dados do banco e envia funcoes para outras telas poderem adicionar, editar ou remover livros.

### Imports

```js
import BookItem from '../components/BookItem';
```

Importa o componente visual usado para mostrar cada livro dentro da lista.

```js
import React, { useEffect, useState } from 'react';
```

Importa o React e dois hooks:

- `useState`: cria e atualiza estados dentro da tela.
- `useEffect`: executa uma acao quando a tela e carregada.

```js
import { Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
```

Importa componentes visuais do React Native:

- `Text`: exibe textos.
- `View`: organiza elementos na tela.
- `TouchableOpacity`: cria botoes clicaveis.
- `FlatList`: renderiza listas de forma eficiente.
- `ImageBackground`: coloca uma imagem como fundo.

```js
import { atualizarLivro, excluirLivro, iniciarBanco, inserirLivro, listarLivros } from '../storage/database';
```

Importa as funcoes da camada de banco de dados:

- `iniciarBanco`: cria a tabela e insere dados iniciais se necessario.
- `listarLivros`: busca os livros salvos.
- `inserirLivro`: cadastra um novo livro.
- `atualizarLivro`: atualiza um livro existente.
- `excluirLivro`: remove um livro do banco.

### Estado `livros`

```js
const [livros, setLivros] = useState([]);
```

Esse estado guarda a lista de livros exibida na tela. Inicialmente ele comeca vazio. Depois que o banco e carregado, `setLivros` atualiza a lista com os livros encontrados.

### Carregamento inicial

```js
useEffect(() => {
  async function carregarLivros() {
    await iniciarBanco();
    const livrosSalvos = await listarLivros();
    setLivros(livrosSalvos);
  }

  carregarLivros();
}, []);
```

Quando a `HomeScreen` abre pela primeira vez, o `useEffect` executa `carregarLivros`.

Essa funcao faz tres coisas:

1. Chama `iniciarBanco()` para garantir que o banco e a tabela existem.
2. Chama `listarLivros()` para buscar os livros salvos.
3. Atualiza o estado `livros` com `setLivros(livrosSalvos)`.

O array vazio `[]` no final indica que esse efeito roda apenas uma vez, quando a tela e montada.

### Funcao `adicionarLivro`

```js
async function adicionarLivro(novoLivro) {
  const livroSalvo = await inserirLivro(novoLivro);
  setLivros((prev) => [...prev, livroSalvo]);
}
```

Essa funcao recebe um livro vindo da tela de formulario, salva no banco usando `inserirLivro` e atualiza a lista da tela inicial.

O retorno de `inserirLivro` contem o `id` gerado pelo banco. Por isso a tela adiciona `livroSalvo`, e nao apenas `novoLivro`.

### Funcao `removerLivro`

```js
async function removerLivro(id) {
  await excluirLivro(id);
  setLivros((prev) => prev.filter((livro) => livro.id !== id));
}
```

Essa funcao remove o livro do banco e tambem remove o item do estado local da tela.

O `filter` cria uma nova lista sem o livro que possui o `id` informado.

### Funcao `editarLivro`

```js
async function editarLivro(livroAtualizado) {
  await atualizarLivro(livroAtualizado);
  setLivros((prev) =>
    prev.map((livro) =>
      livro.id === livroAtualizado.id ? livroAtualizado : livro
    )
  );
}
```

Essa funcao atualiza o livro no banco e depois atualiza a lista exibida na `HomeScreen`.

O `map` percorre todos os livros. Quando encontra o livro com o mesmo `id`, substitui pelo livro atualizado. Os outros continuam iguais.

### Renderizacao da lista

A tela usa `FlatList` para exibir os livros:

```js
<FlatList
  data={livros}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <BookItem
      livro={item}
      onPress={() =>
        navigation.navigate("Details", {
          ...item,
          editarLivro,
          removerLivro,
        })
      }
    />
  )}
/>
```

O `data={livros}` informa qual lista sera renderizada.

O `keyExtractor` usa o `id` de cada livro como identificador unico.

Para cada item, a tela renderiza um `BookItem`. Quando o usuario toca em "Ver detalhes", a aplicacao navega para `Details`, enviando:

- Os dados do livro selecionado.
- A funcao `editarLivro`.
- A funcao `removerLivro`.

Essas funcoes sao enviadas para que a tela de detalhes consiga editar ou remover um livro e manter a tela inicial sincronizada.

## Componente de item: `BookItem.js`

O `BookItem` e um componente reutilizavel responsavel por exibir um livro dentro da lista.

### Imports

```js
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
```

Ele usa:

- `Text`: para mostrar o titulo.
- `View`: para organizar capa, titulo e botao.
- `Image`: para mostrar a capa do livro.
- `TouchableOpacity`: para criar o botao "Ver detalhes".

### Props recebidas

```js
function BookItem({ livro, onPress, onEdit, onDelete }) {
```

O componente recebe:

- `livro`: objeto com os dados do livro.
- `onPress`: funcao executada ao tocar no botao "Ver detalhes".
- `onEdit` e `onDelete`: props declaradas, mas atualmente nao utilizadas dentro do componente.

Na pratica, a `HomeScreen` usa apenas `livro` e `onPress`.

### Relacao com a `HomeScreen`

A `HomeScreen` envia um livro para o `BookItem`. O `BookItem` apenas mostra as informacoes e chama `onPress` quando o usuario quer abrir os detalhes.

Assim, o `BookItem` nao conhece a navegacao diretamente. Ele apenas executa a funcao que recebeu. Quem decide navegar para `Details` e a `HomeScreen`.

## Tela de detalhes: `DetailsScreen.js`

A `DetailsScreen` mostra as informacoes completas do livro selecionado e permite editar ou remover esse livro.

### Imports

```js
import { useState } from "react";
```

Importa o hook usado para manter os dados do livro atual dentro da tela.

```js
import { Text, Image, ImageBackground, TouchableOpacity } from "react-native";
```

Importa componentes visuais:

- `Text`: exibe dados do livro.
- `Image`: exibe a capa.
- `ImageBackground`: define a imagem de fundo.
- `TouchableOpacity`: cria os botoes "Editar" e "Remover".

### Estado local do livro

```js
const [livro, setLivro] = useState(route.params);
```

A tela recebe os dados do livro por `route.params`, enviados pela `HomeScreen`.

Esses dados sao colocados em um estado local chamado `livro`. Isso permite atualizar a tela de detalhes depois que o usuario edita o livro.

### Dados extraidos do livro

```js
const { id, capa, titulo, autor, ano, disponivel, editarLivro, removerLivro } = livro;
```

Aqui a tela separa os campos do objeto:

- `id`, `capa`, `titulo`, `autor`, `ano`, `disponivel`: dados do livro.
- `editarLivro`: funcao recebida da `HomeScreen`.
- `removerLivro`: funcao recebida da `HomeScreen`.

### Botao Editar

Quando o usuario toca em "Editar", a tela navega para `Form`.

```js
navigation.navigate("Form", {
  livro: livro,
  editarLivro,
  atualizarLivrosDetalhes: (livroAtualizado) => {
    setLivro((livroAnterior) => ({
      ...livroAnterior,
      ...livroAtualizado,
    }));
  },
})
```

Sao enviados para o formulario:

- `livro`: dados atuais do livro.
- `editarLivro`: funcao que atualiza o banco e a lista da Home.
- `atualizarLivrosDetalhes`: funcao criada na propria tela de detalhes para atualizar o estado local.

Essa estrutura garante que, ao editar um livro, tanto a lista da tela inicial quanto a tela de detalhes sejam atualizadas.

### Botao Remover

```js
onPress={async () => {
  await removerLivro(id);
  navigation.goBack();
}}
```

Quando o usuario remove um livro:

1. A funcao `removerLivro(id)` e chamada.
2. O livro e removido do banco e da lista da Home.
3. A tela volta para a tela anterior com `navigation.goBack()`.

## Tela de formulario: `FormSreens.js`

A tela `FormScreen` e usada em dois momentos:

- Para cadastrar um novo livro.
- Para editar um livro existente.

Mesmo existindo o nome de arquivo `FormSreens.js`, o componente exportado se chama `FormScreen`.

### Imports

```js
import { useEffect, useState } from "react";
```

Importa:

- `useState`: cria estados para os campos do formulario.
- `useEffect`: atualiza os campos caso a tela receba um livro para edicao.

```js
import { ImageBackground, Switch, Text, TextInput, TouchableOpacity } from "react-native";
```

Importa componentes visuais:

- `ImageBackground`: fundo da tela.
- `Switch`: controle de disponibilidade.
- `Text`: rotulos dos campos.
- `TextInput`: campos de texto.
- `TouchableOpacity`: botao de salvar.

### Parametros recebidos pela rota

```js
const livro = route.params?.livro;
const adicionarLivro = route.params?.adicionarLivro;
const editarLivro = route.params?.editarLivro;
const atualizarLivrosDetalhes = route.params?.atualizarLivrosDetalhes;
```

A tela usa `route.params` para saber se esta adicionando ou editando.

Quando vem da `HomeScreen` para adicionar, recebe `adicionarLivro`.

Quando vem da `DetailsScreen` para editar, recebe:

- `livro`
- `editarLivro`
- `atualizarLivrosDetalhes`

O operador `?.` evita erro caso algum parametro nao exista.

### Estados dos campos

```js
const [titulo, setTitulo] = useState(livro ? livro.titulo : "");
const [autor, setAutor] = useState(livro ? livro.autor : "");
const [ano, setAno] = useState(livro ? livro.ano : "");
const [capa, setCapa] = useState(livro ? livro.capa : "");
const [disponivel, setDisponivel] = useState(livro ? livro.disponivel : true);
```

Cada campo do formulario possui seu proprio estado.

Se existir um `livro`, significa que a tela esta no modo edicao. Nesse caso, os campos ja comecam preenchidos.

Se nao existir um `livro`, significa que a tela esta no modo cadastro. Nesse caso, os campos comecam vazios e `disponivel` comeca como `true`.

### Atualizacao quando recebe um livro

```js
useEffect(() => {
  if (livro) {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAno(livro.ano);
    setCapa(livro.capa);
    setDisponivel(livro.disponivel);
  }
}, [livro]);
```

Esse efeito garante que, se a tela receber um livro para edicao, os campos sejam preenchidos com os dados corretos.

### Funcao `salvarLivro`

```js
async function salvarLivro() {
  const novoLivro = {
    id: livro ? livro.id : undefined,
    capa,
    titulo,
    autor,
    ano,
    disponivel,
  };

  if (livro) {
    await editarLivro(novoLivro);
    atualizarLivrosDetalhes(novoLivro);
  } else {
    await adicionarLivro(novoLivro);
  }

  navigation.goBack();
}
```

Essa e a funcao principal da tela de formulario.

Ela monta um objeto `novoLivro` com os valores digitados. Depois verifica:

- Se existe `livro`, esta editando.
- Se nao existe `livro`, esta cadastrando.

No modo edicao:

1. Chama `editarLivro(novoLivro)` para atualizar banco e lista da Home.
2. Chama `atualizarLivrosDetalhes(novoLivro)` para atualizar a tela de detalhes.

No modo cadastro:

1. Chama `adicionarLivro(novoLivro)` para inserir no banco e atualizar a lista da Home.

Depois disso, a tela volta com `navigation.goBack()`.

## Banco de dados: `database.js`

O arquivo `database.js` concentra toda a comunicacao com o SQLite. Isso e importante porque as telas nao precisam escrever comandos SQL diretamente.

### Import

```js
import * as SQLite from "expo-sqlite";
```

Importa todas as funcionalidades de SQLite da biblioteca `expo-sqlite`.

### Variavel `database`

```js
let database;
```

Essa variavel guarda a conexao com o banco. Ela comeca vazia e recebe o banco quando `getDatabase` e chamada pela primeira vez.

### Lista `livrosIniciais`

```js
const livrosIniciais = [...]
```

Essa lista contem livros usados para preencher o banco quando ele esta vazio. Ela funciona como dados iniciais de demonstracao.

### Funcao `getDatabase`

```js
async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync("AppBooks.db");
  }

  return database;
}
```

Essa funcao abre o banco `AppBooks.db`.

Ela tambem evita abrir o banco varias vezes. Se `database` ja existe, apenas retorna a conexao existente.

### Funcao `mapLivro`

```js
function mapLivro(row) {
  return {
    ...row,
    id: String(row.id),
    disponivel: Boolean(row.disponivel),
  };
}
```

Essa funcao ajusta os dados vindos do SQLite para o formato usado pelo app.

No SQLite:

- `id` vem como numero.
- `disponivel` e salvo como `0` ou `1`.

No app:

- `id` e tratado como string.
- `disponivel` e tratado como booleano, ou seja, `true` ou `false`.

### Funcao `iniciarBanco`

```js
export async function iniciarBanco() {
```

Essa funcao prepara o banco para uso.

Ela cria a tabela `livros` caso ela ainda nao exista:

```sql
CREATE TABLE IF NOT EXISTS livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano TEXT NOT NULL,
  disponivel INTEGER NOT NULL,
  capa TEXT
);
```

Depois, verifica quantos livros existem:

```js
const resultado = await db.getFirstAsync("SELECT COUNT(*) AS total FROM livros;");
```

Se o total for `0`, insere os livros iniciais usando `inserirLivro`.

### Funcao `listarLivros`

```js
export async function listarLivros() {
  const db = await getDatabase();
  const livros = await db.getAllAsync("SELECT * FROM livros ORDER BY id;");

  return livros.map(mapLivro);
}
```

Busca todos os livros no banco, ordenados por `id`.

Depois usa `mapLivro` para converter os dados para o formato esperado pela aplicacao.

### Funcao `inserirLivro`

```js
export async function inserirLivro(livro) {
```

Insere um novo livro na tabela.

O valor `disponivel` e convertido:

- `true` vira `1`
- `false` vira `0`

Depois da insercao, a funcao retorna o livro com o `id` gerado pelo SQLite:

```js
id: String(resultado.lastInsertRowId)
```

### Funcao `atualizarLivro`

```js
export async function atualizarLivro(livro) {
```

Atualiza os dados de um livro existente com base no `id`.

Ela altera:

- `titulo`
- `autor`
- `ano`
- `disponivel`
- `capa`

O `id` e convertido para numero com `Number(livro.id)` porque o banco trabalha com `id` numerico.

### Funcao `excluirLivro`

```js
export async function excluirLivro(id) {
  const db = await getDatabase();

  await db.runAsync("DELETE FROM livros WHERE id = ?;", Number(id));
}
```

Remove um livro do banco usando o `id`.

Assim como na atualizacao, o `id` e convertido para numero antes de ser usado na consulta SQL.

## Como as partes se relacionam

O relacionamento principal da aplicacao pode ser entendido assim:

```text
HomeScreen
|-- chama database.js para carregar, inserir, editar e excluir livros
|-- renderiza BookItem para cada livro
|-- navega para DetailsScreen enviando dados e funcoes
|-- navega para FormScreen enviando a funcao adicionarLivro

DetailsScreen
|-- recebe dados do livro pela navegacao
|-- recebe funcoes da HomeScreen
|-- pode chamar removerLivro
|-- pode abrir FormScreen para edicao

FormScreen
|-- recebe funcoes pela navegacao
|-- usa os campos de formulario para montar um objeto livro
|-- chama adicionarLivro quando esta cadastrando
|-- chama editarLivro quando esta editando

database.js
|-- nao renderiza interface
|-- apenas cria tabela e executa operacoes SQLite
```

## Fluxo de cadastro de livro

```text
Usuario toca em "Adicionar"
HomeScreen navega para FormScreen
FormScreen recebe adicionarLivro
Usuario preenche os campos
Usuario toca em "Salvar"
FormScreen chama adicionarLivro
HomeScreen chama inserirLivro
database.js salva no SQLite
HomeScreen atualiza o estado livros
Aplicacao volta para a Home
```

## Fluxo de visualizacao de detalhes

```text
Usuario toca em "Ver detalhes"
BookItem chama onPress
HomeScreen navega para DetailsScreen
HomeScreen envia dados do livro
DetailsScreen exibe capa, titulo, autor, ano e disponibilidade
```

## Fluxo de edicao de livro

```text
Usuario abre os detalhes de um livro
Usuario toca em "Editar"
DetailsScreen navega para FormScreen
FormScreen recebe o livro atual e as funcoes de edicao
Usuario altera os campos
Usuario toca em "Salvar"
FormScreen chama editarLivro
HomeScreen atualiza o banco e a lista
FormScreen chama atualizarLivrosDetalhes
DetailsScreen atualiza os dados exibidos
Aplicacao volta para DetailsScreen
```

## Fluxo de remocao de livro

```text
Usuario abre os detalhes de um livro
Usuario toca em "Remover"
DetailsScreen chama removerLivro
HomeScreen chama excluirLivro
database.js remove o registro do SQLite
HomeScreen atualiza a lista local
Aplicacao volta para HomeScreen
```

## Modelo de dados de um livro

Um livro usado pela aplicacao possui este formato geral:

```js
{
  id: "1",
  capa: "https://...",
  titulo: "Nome do livro",
  autor: "Nome do autor",
  ano: "2026",
  disponivel: true
}
```

No banco SQLite, a tabela possui estes campos:

```text
id          INTEGER PRIMARY KEY AUTOINCREMENT
titulo      TEXT NOT NULL
autor       TEXT NOT NULL
ano         TEXT NOT NULL
disponivel  INTEGER NOT NULL
capa        TEXT
```

O campo `disponivel` e salvo como numero no banco, mas usado como booleano na interface.

## Observacoes sobre o codigo atual

- A pasta `app/` existe por causa do template do Expo, mas o projeto atual usa `index.js` como entrada principal.
- O arquivo `FormSreens.js` possui um nome com grafia diferente de `FormScreen`, mas o import em `App.js` funciona porque aponta exatamente para esse arquivo.
- O componente `BookItem` declara as props `onEdit` e `onDelete`, mas atualmente elas nao sao usadas.
- Em `BookItem`, existe a propriedade `fontweight`; em React Native o correto seria `fontWeight`.
- As funcoes de banco ficam separadas em `database.js`, o que deixa as telas mais simples e evita espalhar SQL pela interface.

## Resumo final

O appBooks e organizado de forma simples e direta. A `HomeScreen` e o centro da aplicacao, pois guarda a lista de livros e as funcoes principais de adicionar, editar e remover. A `DetailsScreen` mostra um livro especifico e permite acionar edicao ou remocao. A `FormScreen` reutiliza o mesmo formulario tanto para cadastro quanto para edicao. O arquivo `database.js` cuida da persistencia local com SQLite.

Essa separacao torna o projeto mais facil de entender: telas cuidam da interface e da navegacao, enquanto o arquivo de banco cuida dos dados.
