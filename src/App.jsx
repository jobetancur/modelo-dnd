import { useEffect, useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
// Recordar instalar la libreria de dnd => npm install @hello-pangea/dnd --save
// Consultar la documentación de @hello-pangea/dnd => https://github.com/hello-pangea/dnd

// const initialTodos = [
//   {id:1, title: 'Todo 1', description: 'Description 1', completed: false},
//   {id:2, title: 'Todo 2', description: 'Description 2', completed: false}, 
//   {id:3, title: 'Todo 3', description: 'Description 3', completed: false}
// ]

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {id:1, title: 'Todo 1', description: 'Description 1', completed: false},
  {id:2, title: 'Todo 2', description: 'Description 2', completed: false}, 
  {id:3, title: 'Todo 3', description: 'Description 3', completed: false}
];

function App() {
  
  const [ todos, setTodos ] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if(!result.destination) return;
    // Si no hay destino correcto, no se hace nada. Cuando se mueve sin soltar el elemento, el destino es null.

    const initialIndex = result.source.index;
    const finalIndex = result.destination.index;
    
    const newTodos = [...todos];

    const [removed] = newTodos.splice(initialIndex, 1);
    // Se desestructura el array para obtener el elemento que se removió.
    newTodos.splice(finalIndex, 0, removed);
    // Se inserta el elemento removido en el primer .splice en la nueva posición.
    
    setTodos(newTodos);
    
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>TODO APP</h1>

      <Droppable droppableId={"todosDropp"}>
        {
          (droppableProvider) => (
            <ul
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {
                todos.map((todo, index) => (
                  <Draggable 
                    key={todo.id}
                    index={index} // La librería siempre pide un index como prop. Esto servirá para reordenar los elementos.
                    draggableId={todo.id.toString()}
                  >
                    {
                      (draggableProvider) => (
                        <li
                          ref={draggableProvider.innerRef}
                          {...draggableProvider.draggableProps}
                          {...draggableProvider.dragHandleProps}
                        >
                          {todo.description}
                        </li>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvider.placeholder}
              {/* El placeholder ayuda a reservar el espacio vacío al mover el elemento. */}
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default App
