//para usuários logados

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";  //tipo de navegação
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

//tipagem de parâmetros
export type StackPramsList = {
    Dashboard: undefined
    Order: {
        number: number | string
        order_id: string
    }
}

const Stack = createNativeStackNavigator<StackPramsList>()

export default function AppRoutes(){
    return(
        <Stack.Navigator>
            {/* telas */}
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/> 
            <Stack.Screen name="Order" component={Order} options={{headerShown: false}}/> 
        </Stack.Navigator>
    )
}