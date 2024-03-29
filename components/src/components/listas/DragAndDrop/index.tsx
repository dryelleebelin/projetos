import React, { useState, FormEvent } from "react";
import './draganddrop.scss'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import { Task } from "./task.tsx";

export default function DragAndDrop(){
  const [newTast, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: "0", name: "Criar uma API RESTful para o aplicativo de lista de tarefas"},
    { id: "1", name: "Atualizar a versão de uma biblioteca utilizada no projeto"},
    { id: "2", name: "Renomear uma variável para tornar o código mais legível"},
    { id: "3", name: "Escrever testes unitários"},
    { id: "4", name: "Corrigir um erro de digitação em um arquivo de código-fonte"}
  ])

  function handleAddTask(event: FormEvent) {
    event.preventDefault();
    if (newTast === '') return;

    let newItem = {
      id: `${tasks.length + 1}`,
      name: newTast
    }
    setTasks(allTasks => [...allTasks, newItem])
    setNewTask('')
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number){
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result: any){
    if(!result.destination){
      return
    }
    //console.log(result.source.index) - devolve a posição inicial do item
    //console.log(result.destination.index) - devolve a posição onde soltou o item
    const items = reorder(tasks, result.source.index, result.destination.index)
    setTasks(items)
  }

  return (
    <div className="draganddrop">
      <h1>Tarefas</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Digite o nome da tarefa..."
          value={newTast}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <section>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <article ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index}/>
                ))}

                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  )
}