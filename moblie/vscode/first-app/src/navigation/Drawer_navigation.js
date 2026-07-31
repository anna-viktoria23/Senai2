// 1. Importa a função que cria o menu de navegação lateral (Drawer)
import { createDrawerNavigator } from "@react-navigation/drawer";

// 2. Importa os componentes das telas que farão parte do menu lateral
import HomeScreen from "./screens/HomeScreen";
import PerfilScreen from "./screens/PerfilScreen";
import ConfigScreen from "./screens/ConfigScreen";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      
      <Drawer.Screen name="Perfil" component={PerfilScreen} />

      <Drawer.Screen name="config" component={ConfigScreen} />
      
    </Drawer.Navigator>
  );
}


















// import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "./screens-classroom/HomeScreen";
// import PerfilScreen from "./screens-classroom/PerfilScreen";
// import ConfigScreen from "./screens-classroom/ConfigScreen";

// const Drawer = createDrawerNavigator();
// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Perfil" component={PerfilScreen} />
//       <Drawer.Screen name="config" comnent={ConfigScreen} />
//     </Drawer.Navigator>
//   );
// }