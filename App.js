import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import FormScreen from "./src/screens/FormSreens";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                />

                 <Stack.Screen
                    name="Form"
                    component={FormScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}



export default App;
