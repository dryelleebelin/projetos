//para usuários não logados

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";  //tipo de navegação
import SignIn from "../pages/SignIn";

const Stack = createNativeStackNavigator()

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            {/* telas */}
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/> 
        </Stack.Navigator>
    )
}