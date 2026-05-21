import { useState } from "react";
import { colors } from "../constants/colors";
import {
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import {
    bookAvailabilityText,
    bookCoverAcessibilityLabel,
    bookEditAcessibilityLabel,
    bookRemoveAcessibilityLabel,
} from "../utils/accessibility";

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
                        borderRadius: 8,
                    }}
                    accessibilityLabel={bookCoverAcessibilityLabel(titulo)}
                />
            )}

            <Text style={{ color: colors.white }}>{id}</Text>
            <Text style={{ color: colors.white }}>{titulo}</Text>
            <Text style={{ color: colors.white }}>{autor}</Text>
            <Text style={{ color: colors.white }}>{ano}</Text>
            <Text style={{ color: colors.white }}>{bookAvailabilityText(disponivel)}</Text>

            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 15,
                }}
                accessibilityRole="Button"
                accessibilityLabel={bookEditAcessibilityLabel(titulo)}
                accessibilityHint="Abre o formulario para editar os dados do livro"
                onPress={() =>
                    navigation.navigate("Form", {
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
                        color: colors.white,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Editar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    padding: 12,
                    borderRadius: 6,
                    marginTop: 10,
                }}
                accessibilityRole="button"
                accessibilityLabel={bookRemoveAcessibilityLabel(titulo)}
                accessibilityHint="Remove este livro da lista"
                onPress={async () => {
                    await removerLivro(id);
                    navigation.goBack();
                }}
            >
                <Text
                    style={{
                        color: colors.white,
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
