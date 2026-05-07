import React, { useState, useEffect } from "react";
import { TextInput, Text, Switch, ImageBackground, TouchableOpacity } from "react-native";

function FormScreen({ navigation, route }) {
  const livro = route.params?.livro;
  const adicionarLivro = route.params?.adicionarLivro;
  const editarLivro = route.params?.editarLivro;
  const atualizarLivrosDetalhes = route.params?.atualizarLivrosDetalhes;
  const [titulo, setTitulo] = useState(livro ? livro.titulo : "");
  const [autor, setAutor] = useState(livro ? livro.autor : "");
  const [ano, setAno] = useState(livro ? livro.ano : "");
  const [capa, setCapa] = useState(livro ? livro.capa : "");
  const [disponivel, setDisponivel] = useState(livro ? livro.disponivel : true);

  useEffect(() => {
    if (livro) {
      setTitulo(livro.titulo);
      setAutor(livro.autor);
      setAno(livro.ano);
      setCapa(livro.capa);
      setDisponivel(livro.disponivel);
    }
  }, [livro]);

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

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/2553425/pexels-photo-2553425.jpeg",
      }}
      style={{
        flex: 1,
        padding: 20,
      }}
      resizeMode="cover"
    >
      <Text style={{ color: "#fff" }}>Capa (URL)</Text>
      <TextInput
        style={{ color: "#fff" }}
        value={capa}
        onChangeText={setCapa}
      />

      <Text style={{ color: "#fff" }}>Titulo</Text>
      <TextInput
        style={{ color: "#fff" }}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={{ color: "#fff" }}>Autor</Text>
      <TextInput
        style={{ color: "#fff" }}
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={{ color: "#fff" }}>Ano</Text>
      <TextInput
        style={{ color: "#fff" }}
        value={ano}
        onChangeText={setAno}
      />

      <Text style={{ color: "#fff" }}>Disponivel</Text>
      <Switch
        value={disponivel}
        onValueChange={setDisponivel}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#301c41",
          padding: 12,
          borderRadius: 6,
          marginTop: 10,
        }}
        onPress={salvarLivro}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Salvar
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

export default FormScreen;
