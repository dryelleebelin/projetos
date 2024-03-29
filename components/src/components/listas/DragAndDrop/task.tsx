import React from 'react';
import './draganddrop.scss'
import { Draggable } from '@hello-pangea/dnd';

interface TaskProps {
  task: {
    id: string;
    name: string;
  }
  index: number;
}

export function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div className='task' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <p>{task.name}</p>
        </div>
      )}
    </Draggable>
  );
}
