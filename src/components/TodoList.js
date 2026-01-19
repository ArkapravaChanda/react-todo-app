import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo, reorderTodos }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    reorderTodos(result.source.index, result.destination.index);
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="active-todos">
        {(provided) => (
          <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
            {activeTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? 'dragging' : ''}
                  >
                    <TodoItem
                      todo={todo}
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </li>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
