import React from "react";
import { colors } from "../constants/colors";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  bookCoverAccessibilityLabel, bookDetailAccessibilityLabel,
} from '../utils/accessibility';

function BookItem({ livro, onPress }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.lightGray,
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
          accessibilityLabel={bookCoverAccessibilityLabel(livro.titulo)}
        />
      )}
      <View>
        <Text style={{ color: colors.darkText }}>{livro.titulo}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 5,
            borderRadius: 10,
            marginTop: 50,
            width: 105
          }}
          accessibilityRole="button"
          accessibilityLabel={bookDetailAccessibilityLabel(livro.titulo)}
          accessibilityActions="Abre a tela de detalhes do livro"
          onPress={onPress}
        >
          <Text
            style={{
              color: colors.white,
              textAlign: "center",
              fontWeight: "bold"
            }}>
            Ver detalhes
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}


export default BookItem;