import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";
import { initDatabase } from "./src/database/database";

function App() {
  const [databaseReady, setDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState(null);

  useEffect(() => {
    async function prepareDatabase() {
      try {
        await initDatabase();
        setDatabaseReady(true);
      } catch (error) {
        console.log("Erro ao inicializar o banco de dados:", error);
        setDatabaseError(error);
      }
    }

    prepareDatabase();
  }, []);

  if (databaseError) {
    return (
      <View>
        <Text>Erro ao carregar o banco de dados.</Text>
      </View>
    );
  }

  if (!databaseReady) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}

export default App;
