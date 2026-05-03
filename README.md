# Sistema de Gerenciamento de Biblioteca

## Sobre o Projeto

Este projeto consiste no desenvolvimento de um aplicativo mobile para gerenciamento de biblioteca, criado com o objetivo de aplicar conceitos básicos de desenvolvimento mobile utilizando o framework Expo.

A aplicação permite gerenciar livros, incluindo visualização, cadastro e controle de disponibilidade, simulando um sistema simples de biblioteca.

Este documento tem como finalidade apresentar a estrutura, funcionamento e instruções de execução do projeto.

## Observações

Este projeto foi desenvolvido para fins acadêmicos, com foco no aprendizado de conceitos iniciais de desenvolvimento mobile, estruturação de aplicações e organização de código.

---

## Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- Node.js

---

## 1. Criação do Projeto

O projeto foi desenvolvido utilizando o framework Expo, que facilita a criação de aplicações mobile com React Native, permitindo execução rápida em dispositivos físicos e emuladores.

Para iniciar o projeto, foi utilizado os seguinte comandos:

```bash
npx create-expo-app appBooks

Direcionando diretório:

```bash cd appBooks 

//Este comando abre o ambiente de desenvolvimento, permitindo executar o aplicativo em emuladores ou no dispositivo físico através do aplicativo Expo Go.

Instalação das dependências:

```bash npm install

## Como Executar o Projeto

Siga os passos abaixo para executar a aplicação localmente:

```npx expo start

## Estrutura do Projeto

O projeto está organizado de forma modular, separando componentes, telas e funcionalidades específicas para facilitar a manutenção e escalabilidade.

### Nesta pasta se encontra os principais componentes da aplicação:

- `/app`

### src/components
Contém componentes reutilizáveis da aplicação.

- `BookItem.js`: Responsável por exibir as informações de um livro na lista.

### src/screens
Contém as telas principais da aplicação.

- `HomeScreen.js`: Tela inicial com listagem de livros
- `DetailsScreen.js`: Tela de detalhes do livro
- `FormScreen.js`: Tela para cadastro ou edição de livros

### src/storage
Responsável pela manipulação de dados (armazenamento local ou futura integração com banco de dados).

---

Outros arquivos importantes:

- `App.js`: Arquivo principal da aplicação
- `package.json`: Gerenciamento de dependências

## 📖 Funcionalidade: Listagem de Livros

A funcionalidade de listagem de livros é responsável por exibir os itens cadastrados na aplicação, permitindo ao usuário visualizar informações básicas como título, autor e disponibilidade.

### Estrutura dos Dados

Os livros são armazenados em um estado local utilizando o hook `useState`, contendo um array de objetos com as seguintes propriedades:

- `id`: Identificador único do livro
- `titulo`: Nome do livro
- `autor`: Autor da obra
- `disponivel`: Indica se o livro está disponível para empréstimo

Exemplo de estrutura:

```javascript
{
  id: "1",
  titulo: "O Senhor dos Anéis",
  autor: "J.R.R. Tolkien",
  disponivel: true
}


