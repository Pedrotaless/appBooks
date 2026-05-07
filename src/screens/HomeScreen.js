import { useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookItem from "../components/BookItem";

function HomeScreen({ navigation, route }) {
  //Array de livros
  const [livros, setLivros] = useState([
    {
      id: "1",
      titulo: "Entendendo Algoritmos",
      autor: "Aditya Y. Bhargava",
      ano: "2017",
      disponivel: true,
      capa: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SY342_.jpg",
    },
    {
      id: "2",
      titulo: "Código Limpo: Habilidades Práticas do Agile Software",
      autor: "Robert C. Martin",
      ano: "2009",
      disponivel: false,
      capa: "https://m.media-amazon.com/images/I/71dH97FwGbL._SY342_.jpg",
    },
    {
      id: "3",
      titulo: "JavaScript: O Guia Definitivo",
      autor: "David Flanagan",
      ano: "2012",
      disponivel: true,
      capa: "https://m.media-amazon.com/images/I/816vDdUauOL._SY342_.jpg",
    },
  ]);

  const proximoId = useRef(4);

  function adicionarLivro(novoLivro) {
    const livroComId = {
      ...novoLivro,
      id: String(proximoId.current),
    };

    proximoId.current += 1;

    setLivros((prev) => [...prev, livroComId]);
  }

  function removerLivro(id) {
    setLivros((prev) => prev.filter((livro) => livro.id !== id));
  }

  function editarLivro(livroAtualizado) {
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id === livroAtualizado.id ? livroAtualizado : livro,
      ),
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
            color: "#ffffff",
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
          onPress={() =>
            navigation.navigate("Form", {
              adicionarLivro,
            })
          }
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
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
