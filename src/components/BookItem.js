import React from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";

function BookItem({ livro, onPress, onEdit, onDelete }) {
  return (
    <View style={{
      flexDirection: "row",
      backgroundColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 10,
      elevation: 15

    }}>

      {livro.capa && (
        <Image
          // Define a imagem usando URL.
          source={{ uri: livro.capa }}
          style={{ width: 70, height: 100, marginRight: 10 }}
        />
      )}

      {/* Container das informações */}
      <View>
        <Text>{livro.titulo}</Text>

        {/* Botão personalizado */}
        <TouchableOpacity
          // Estilos do botão
          style={{
            backgroundColor: "#175980",
            padding: 8,
            borderRadius: 10,
            marginTop: 6,
            width: 120
          }}

          onPress={onPress}
        >
          {/* Texto do botão */}
          <Text
            style={{
              color: "#ccc",
              textAlign: "row",
              fontweight: "bold"
            }}>
            Ver detalhes
          </Text>
        </TouchableOpacity>
      </View>

    </View >
  )
}

// Exporta o componente para ser usado em outros arquivos.
export default BookItem;
