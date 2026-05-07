import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

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
            backgroundColor: "#301c41",
            padding: 5,
            borderRadius: 10,
            marginTop: 50,
            width: 105
          }}

          onPress={onPress}
        >
          <Text
            style={{
              color: "#ccc",
              textAlign: "center",
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