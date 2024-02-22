//para usuários logados

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";  //tipo de navegação
import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator()

export default function AppRoutes(){
    return(
        <Stack.Navigator>
            {/* telas */}
            <Stack.Screen name="Dashboard" component={Dashboard}/> 
        </Stack.Navigator>
    )
}