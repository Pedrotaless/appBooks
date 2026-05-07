import { useState } from "react";
import { Text, Image, ImageBackground, TouchableOpacity } from "react-native";

function DetailsScreen({ route, navigation }) {
    const [livro, setLivro] = useState(route.params);

    const { id, capa, titulo, autor, ano, disponivel, editarLivro, removerLivro } = livro;

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
            {capa && (
                <Image
                    source={{ uri: capa }}
                    style={{
                        width: 180,
                        height: 260,
                        alignSelf: "center",
                        marginBottom: 15,
                        borderRadius: 8,
                    }}
                />
            )}

            <Text style={{ color: "#fff" }}>{id}</Text>
            <Text style={{ color: "#fff" }}>{titulo}</Text>
            <Text style={{ color: "#fff" }}>{autor}</Text>
            <Text style={{ color: "#fff" }}>{ano}</Text>
            <Text style={{ color: "#fff" }}>{disponivel ? "Disponivel" : "Indisponivel"}</Text>

            <TouchableOpacity
                style={{
                    backgroundColor: "#301c41",
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 15,
                }}
                onPress={() => navigation.navigate("Form", {
                    livro: livro,
                    editarLivro,
                    atualizarLivrosDetalhes: (livroAtualizado) => {
                        setLivro((livroAnterior) => ({
                            ...livroAnterior,
                            ...livroAtualizado,
                        }));
                    },
                })}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Editar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#301c41",
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 10,
                }}
                onPress={async () => {
                    await removerLivro(id);
                    navigation.goBack();
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Remover
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

export default DetailsScreen;
