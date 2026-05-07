// Importa o hook useState do React.
// O useState é usado para criar e controlar estados dentro do componente.
import { useState } from "react";

// Importa componentes visuais do React Native.
// Text -> exibe textos
// View -> funciona como uma div/container
// Image -> exibe imagens
// Button -> cria botões
import { Button, Image, Text, View } from "react-native";

// Criação do componente DetailsScreen.
// Ele recebe duas propriedades automaticamente do React Navigation:
// route -> contém os parâmetros enviados pela navegação
// navigation -> permite navegar entre telas
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

  // Retorno visual do componente.
  // Tudo que estiver aqui será renderizado na tela.
  return (
    // View principal que agrupa todos os elementos.
    <View>
      style=
      {{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
      }}
      {capa && (
        // Componente de imagem.
        <Image
          // source recebe a URL da imagem.
          // uri é obrigatório para imagens vindas da internet.
          source={{ uri: capa }}
          // style define a aparência da imagem.
          style={{
            width: 180, // largura da imagem
            height: 260, // altura da imagem
            alignSelf: "center", // centraliza horizontalmente
            marginBottom: 15, // espaço abaixo da imagem
            borderRadius: 8, // deixa as bordas arredondadas
          }}
        />
      )}
      {/* Exibe o ID do livro */}
      <Text>{id}</Text>
      {/* Exibe o título */}
      <Text>{titulo}</Text>
      {/* Exibe o autor */}
      <Text>{autor}</Text>
      {/* Exibe o ano */}
      <Text>{ano}</Text>
      {/* 
                Operador ternário:
                Se disponivel for true -> mostra "Disponível"
                Se for false -> mostra "Indisponível"
            */}
      <Text>{disponivel ? "Disponível" : "Indisponível"}</Text>
      {/* Botão de editar */}
      <Button
        // Texto exibido no botão
        title="Editar"
        // Função executada ao clicar
        onPress={() =>
          // Navega para a tela chamada "Form"
          navigation.navigate("Form", {
            // Envia o objeto livro atual
            livro: livro,

            // Envia a função editarLivro
            editarLivro,

            // Função usada para atualizar os dados na tela Details
            atualizarLivrosDetalhes: (livroAtualizado) => {
              // Atualiza o estado do livro
              // livroAnterior = estado antigo
              setLivro((livroAnterior) => ({
                // Mantém os dados antigos
                ...livroAnterior,

                // Substitui pelos novos dados atualizados
                ...livroAtualizado,
              }));
            },
          })
        }
      />
      {/* Botão de remover */}
      <Button
        // Texto do botão
        title="Remover"
        // Função executada ao clicar
        onPress={() => {
          // Chama a função removerLivro passando o ID
          removerLivro(id);

          // Volta para a tela anterior
          navigation.goBack();
        }}
      />
    </View>
  );
}

// Exporta o componente.
// Isso permite importar essa tela em outros arquivos.
export default DetailsScreen;
