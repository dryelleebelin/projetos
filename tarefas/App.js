import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import {FontAwesome} from '@expo/vector-icons'
import Tarefa from "./src/Tarefa";

export default function App(){
  const [tarefa, setTarefa] = useState('')
  const [list, setList] = useState([])
  function handleAdd(){
    if(tarefa === ''){
      return
    }
    const dados = {
      key: Date.now(),  //gerar id aleatório
      item: tarefa
    }
    setList(oldArray => [dados, ...oldArray])
    setTarefa('')
  }
  function handleDelete(item){
    let filtroItem = list.filter((tarefa) => {
      return (tarefa.item !== item)
    })
    setList(filtroItem)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <View style={styles.containerInput}>
        <TextInput style={styles.input} value={tarefa} onChangeText={(text) => setTarefa(text)} placeholder="Digite sua tarefa..."/>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}><FontAwesome name="plus" size={20} color="#fff"/></TouchableOpacity>
      </View>
      <FlatList style={styles.list} data={list} keyExtractor={(item) => item.key}  renderItem={({item}) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)}/>}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop: 28,
    flex: 1,
    backgroundColor: '#22272e'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: '5%',
    paddingStart: '5%',
    marginBottom: 12
  },
  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22
  },
  input:{
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  list:{
    flex: 1,
    backgroundColor: '#fff',
    paddingStart: '4%',
    paddingEnd: '4%'
  }
})