import { Text, View } from "react-native";


export function EstruturaJSX() {
    return(
        //retorno unico
        <View>
            <Text>Exemplo de retorno Unico</Text>

        {/*retorno unico com Fragment <> </>  */} 
            <View>
                <>
                <Text></Text>
                
                {/*Exemplo SelfClose */}
                <View />
                
                </>
            </View>
        </View>
);

}