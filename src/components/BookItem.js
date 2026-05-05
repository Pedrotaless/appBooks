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
          source={{ uri: livro.capa }}
          style={{ width: 70, height: 100, marginRight: 10 }}
        />
      )}
      <View>
        <Text>{livro.titulo}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#175980",
            padding: 8,
            borderRadius: 10,
            marginTop: 6,
            width: 120
          }}

          onPress={onPress}
        >
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


export default BookItem;