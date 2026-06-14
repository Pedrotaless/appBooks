// Importa o hook useState do React.
// O useState é usado para criar e controlar estados dentro do componente.
import { useState } from "react";
import { Text, Image, Button, ImageBackground } from "react-native";

import { colors } from "../constants/colors";


function DetailsScreen({ route, navigation }) {
  // Cria um estado chamado "livro".
  // route.params contém os dados enviados da tela anterior.
  // setLivro será usado para atualizar o estado do livro.
  const [livro, setLivro] = useState(route.params);

  // Desestruturação do objeto livro.
  // Aqui estamos pegando os valores do objeto e criando variáveis separadas.
  const {
    id,
    capa,
    titulo,
    autor,
    ano,
    disponivel,
    editarLivro,
    removerLivro,
  } = livro;


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
        {capa && (
            <Image
                source={{ uri: capa }}
                style={{
                    width: 180,
                    height: 260,
                    alignSelf: "center",
                    marginBottom: 15,
                    borderRadius: 8
                }}
            />
        )}

        <Text style={{ color: colors.white }}>{id}</Text>
        <Text style={{ color: colors.white }}>{titulo}</Text>
        <Text style={{ color: colors.white }}>{autor}</Text>
        <Text style={{ color: colors.white }}>{ano}</Text>
        <Text style={{ color: colors.white }}>{disponivel ? "Disponível" : "Indisponível"}</Text>

        <Button
            title="Editar"
            onPress={() => navigation.navigate("Form", {
                livro: livro,
                editarLivro,
                atualizarLivrosDetalhes: (livroAtualizado) => {
                    setLivro((livroAnterior) => ({
                        ...livroAnterior,
                        ...livroAtualizado
                    }));
            }
            })}

        />

        <Button
            title="Remover"
            onPress={() => {
                removerLivro(id);
                navigation.goBack();
            }}
        />

    </ImageBackground>

 );
}


export default DetailsScreen;
