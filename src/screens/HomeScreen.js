import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import BookItem from '../components/BookItem';
import React, { useState, useRef } from 'react';



function HomeScreen({ navigation, route }) {

  //Array de livros
  const [livros, setLivros] = useState([
    { id: "1", titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", disponivel: true, capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
    { id: "2", titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", disponivel: false, capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
    { id: "3", titulo: "O Hobbit", autor: "J.R.R. Tolkien", disponivel: true, capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg" }
  ]);

  const proximoId = useRef(4);

  function adicionarLivro(novoLivro) {
    const livroComId = {
      ...novoLivro,
      id: String(proximoId.current)
    };

    proximoId.current += 1;

    setLivros((prev) => [...prev, livroComId]);
  }

  function removerLivro(id) {
    setLivros((prev) => prev.filter((livro) => livro.id !== id));
  }

  function editarLivro(livroAtualizado) {
    setLivros((prev) => prev.map((livro) => livro.id === livroAtualizado.id ? livroAtualizado : livro
    )
    );
  }

  return (
    <View style={{ padding: 15 }} >

      <Text style={{
        color: "#175980",
        fontSize: 22,
        textAling: "center",
        fontWeight: "bold",
        marginBottom: 10
      }}>

        Lista de Livros
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#2ecc71",
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 6,
          marginTop: 8,
          width: 120
        }}
        onPress={() => navigation.navigate("Form", {
          adicionarLivro
        })}
      >
        <Text style={{
          color: "#fff",
          textAling: "center",
          fontWeight: "bold"
         }}>
          Adicionar Livro
  
        </Text>
      </TouchableOpacity>
  

      <FlatList
        data={livros} // Array de livros/idenficando a lista a ser usada.
        keyExtractor={(item) => item.id} //cada identificador => cada item da lista
        renderItem={({ item }) => (
          <BookItem
            livro={item}
            onPress={() =>
              navigation.navigate("Details", {
                ...item,
                editarLivro,
                removerLivro
              })
            }
          />
        )}
      />
    </View>
  );
}


export default HomeScreen;





















































































































































































