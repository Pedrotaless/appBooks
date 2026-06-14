import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BookItem from "../components/BookItem";
import { colors } from "../constants/colors";
import { useBooks } from "../hooks/useBooks";

function HomeScreen({ navigation }) {
  const { livros, adicionarLivro, editarLivro, removerLivro } = useBooks();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyaWVzfGVufDB8fDB8fHww&w=1000&q=80",
      }}
      style={{
        flex: 1,
        padding: 8,
      }}
      resizeMode="cover"
      accessible={false}
      importantForAccessibility="no"
    >
      <View style={{ padding: 8 }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Lista de Livros
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 15,
            paddingHorizontal: 56,
            borderRadius: 6,
            marginTop: 8,
            marginBottom: 10,
            alignSelf: "center",
          }}
          accessibilityRole="button"
          accessibilityLabel="Adicionar livro"
          accessibilityHint="Abre o formulario para adicionar um novo livro a lista"
          onPress={() =>
            navigation.navigate("Form", {
              adicionarLivro,
            })
          }
        >
          <Text
            style={{
              color: colors.white,
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
