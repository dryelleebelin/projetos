import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { CategoryProps } from "../../pages/Order";  //tipagem das categorias

interface ModalPickerProps{
    options: CategoryProps[]
    handleCloseModal: () => void  //não devolve nada, só fecha o modal
    selectedItem: (item: CategoryProps) => void
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')  //dimensão da tela do usuário

export default function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){
    function onPressItem(item: CategoryProps){
        selectedItem(item)
        handleCloseModal()
    }

    const option = options.map((item, index) => (  //mapeando categorias
        <TouchableOpacity style={styles.option} key={index} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))

    return(
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    option:{
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item:{
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }
})