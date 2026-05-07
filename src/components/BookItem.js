// Importa o React.
// Necessário para criar componentes React.

// Importa componentes do React Native.
// Text -> exibe textos
// View -> container
// Button -> botão padrão (não está sendo usado)
// Image -> exibe imagens
// TouchableOpacity -> botão customizável com efeito de toque
import { Image, Text, TouchableOpacity, View } from "react-native";

// Criação do componente BookItem.
// Esse componente representa UM livro da lista.
//
// Props recebidas:
// livro -> objeto contendo os dados do livro
// onPress -> função executada ao clicar em "Ver detalhes"
// onEdit -> função para editar (não está sendo usada)
// onDelete -> função para remover (não está sendo usada)
function BookItem({ livro, onPress, onEdit, onDelete }) {
  // Retorno visual do componente.
  return (
    // Container principal do card do livro.
    <View
      style={{
        // Organiza os elementos em linha.
        // Imagem ao lado do texto.
        flexDirection: "row",

        // Cor de fundo do card
        backgroundColor: "#ccc",

        // Espaçamento interno
        padding: 10,

        // Espaçamento inferior
        marginBottom: 10,

        // Espaçamento superior
        marginTop: 10,

        // Bordas arredondadas
        borderRadius: 10,

        // Sombra no Android
        elevation: 15,
      }}
    >
      {/* 
        Verifica se existe uma capa.
        Se existir, renderiza a imagem.
      */}
      {livro.capa && (
        <Image
          // Define a imagem usando URL.
          source={{ uri: livro.capa }}
          // Estilos da imagem.
          style={{
            width: 70,
            height: 100,
            marginRight: 10,
          }}
        />
      )}

      {/* Container das informações */}
      <View>
        {/* Exibe o título do livro */}
        <Text>{livro.titulo}</Text>

        {/* Botão personalizado */}
        <TouchableOpacity
          // Estilos do botão
          style={{
            backgroundColor: "#301c41",
            padding: 5,
            borderRadius: 10,
            marginTop: 50,
            width: 105,
          }}
          // Função executada ao clicar
          onPress={onPress}
        >
          {/* Texto do botão */}
          <Text
            style={{
              // Cor do texto
              color: "#ccc",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Ver detalhes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Exporta o componente para ser usado em outros arquivos.
export default BookItem;
