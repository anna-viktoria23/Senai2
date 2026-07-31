
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import PerfilScreen from "./screens/PerfilScreen";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator(){
    return (
        <Tab.Navigator initiaRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Perfil" component={PerfilScreen}/>
        </Tab.Navigator>


    )
}