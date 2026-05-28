import { useEffect, useState } from "react";
import { Button, Switch, Text, TextInput, View } from "react-native";

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

  function salvarLivro() {
    const novoLivro = {
      id: livro ? livro.id : undefined,
      capa,
      titulo,
      autor,
      ano,
      disponivel,
    };

    if (livro) {
      editarLivro(novoLivro);
      atualizarLivrosDetalhes(novoLivro);
    } else {
      adicionarLivro(novoLivro);
    }

    navigation.goBack(); // Volta para tela anterior
  }

  return (
    <View>
      <Text>Capa (URL)</Text>
      <TextInput value={capa} onChangeText={setCapa} />

      <Text>Título</Text>
      <TextInput value={titulo} onChangeText={setTitulo} />

      <Text>Autor</Text>
      <TextInput value={autor} onChangeText={setAutor} />

      <Text>Ano</Text>
      <TextInput value={ano} onChangeText={setAno} />

      <Text>Disponível</Text>
      <Switch value={disponivel} onValueChange={setDisponivel} />

      <Button title="Salvar" onPress={salvarLivro} />
    </View>
  );
}

export default FormScreen;
