import BookItem from '../components/BookItem';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { atualizarLivro, excluirLivro, iniciarBanco, inserirLivro, listarLivros } from '../storage/database';

function HomeScreen({ navigation }) {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function carregarLivros() {
      await iniciarBanco();
      const livrosSalvos = await listarLivros();
      setLivros(livrosSalvos);
    }

    carregarLivros();
  }, []);

  async function adicionarLivro(novoLivro) {
    const livroSalvo = await inserirLivro(novoLivro);
    setLivros((prev) => [...prev, livroSalvo]);
  }

  async function removerLivro(id) {
    await excluirLivro(id);
    setLivros((prev) => prev.filter((livro) => livro.id !== id));
  }

  async function editarLivro(livroAtualizado) {
    await atualizarLivro(livroAtualizado);
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id === livroAtualizado.id ? livroAtualizado : livro
      )
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{
        flex: 1,
        padding: 8,
      }}
      resizeMode="cover"
    >
      <View style={{ padding: 8 }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Lista de Livros
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#301c41",
            paddingVertical: 15,
            paddingHorizontal: 56,
            borderRadius: 6,
            marginTop: 8,
            marginBottom: 10,
            alignSelf: "center",
          }}
          onPress={() => navigation.navigate("Form", {
            adicionarLivro,
          })}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Adicionar
          </Text>
        </TouchableOpacity>

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
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
