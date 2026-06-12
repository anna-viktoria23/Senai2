//Anna Viktoria Alacamini de Carvalho

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationConteiner>
        <AppNavigator />
      </NavigationConteiner>
    </SafeAreaProvider>
  );
}
