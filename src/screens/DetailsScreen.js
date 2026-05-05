import { useState } from "react";
import { Text, View, Image, Button } from "react-native";


function DetailsScreen({ route, navigation }) {
    const [livro, setLivro] = useState(route.params);

    const { id, capa, titulo, autor, ano, disponivel, editarLivro, removerLivro } = livro;


return (
    <View>

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

        <Text>{id}</Text>
        <Text>{titulo}</Text>
        <Text>{autor}</Text>
        <Text>{ano}</Text>
        <Text>{disponivel ? "Disponível" : "Indisponível"}</Text>

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

    </View>

 );
}


export default DetailsScreen;