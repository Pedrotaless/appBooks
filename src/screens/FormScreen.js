import React, { useState, useEffect } from "react";
import { colors } from "../constants/colors";
import {
  TextInput,
  Text,
  Switch,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

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
      accessible={false}
      importantForAccessibility="no"
     >
      <View
      style={{
        backgroundColor: colors.overlay,
        padding: 16,
        borderRadius: 8,
      }}
     >
      <Text style={{ color: colors.white }}>Capa (URL)</Text>
      <TextInput
          style={{
        color: colors.darkText,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 12,
      }}
        value={capa}
        onChangeText={setCapa}
        accessibilityLabel="URL da capa do livro"
        accessibilityHint="Digite a URL da imagem da capa do livro"
      />

      <Text style={{ color: colors.white }}>Titulo</Text>
      <TextInput
        style={{
        color: colors.darkText,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 12,
      }}
        value={titulo}
        onChangeText={setTitulo}
        accessibilityLabel="Titulo do livro"
        accessibilityHint="Digite o titulo do livro"
      />

      <Text style={{ color: colors.white }}>Autor</Text>
      <TextInput
          style={{
        color: colors.darkText,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 12,
      }}
        value={autor}
        onChangeText={setAutor}
        accessibilityLabel="Autor do livro"
        accessibilityHint="Digite o nome do autor do livro"
      />

      <Text style={{ color: colors.white }}>Ano</Text>
      <TextInput
          style={{
        color: colors.darkText,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 12,
      }}
        value={ano}
        onChangeText={setAno}
        accessibilityLabel="Ano de publicação do livro"
        accessibilityHint="Digite o ano de publicação"
        keyboardType="numeric"
      />

      <Text style={{ color: colors.white }}>Disponivel</Text>
      <Switch
        value={disponivel}
        onValueChange={setDisponivel}
        accessibilityLabel="Disponibilidade do livro"
        accessibilityHint="Ative para marcar o livro como disponível, desative para marcar como indisponível"
      />

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: 12,
          borderRadius: 6,
          marginTop: 10,
        }}
        accessibilityRole="button"
        accessibilityLabel="Salvar livro"
        accessibilityHint="Pressione para salvar as informações do livro"
        onPress={salvarLivro}
      >
        <Text
          style={{
            color: colors.white,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
    </ImageBackground >
  );
}

export default FormScreen;
