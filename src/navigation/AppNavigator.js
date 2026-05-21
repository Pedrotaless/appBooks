import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FormScreen from "../screens/FormScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: "center",
            title: "Lista de Livros",
          }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "Detalhes do Livro",
          }}
        />

        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{
            title: "Cadastro de Livro",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;