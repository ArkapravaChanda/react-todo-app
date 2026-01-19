import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import confetti from 'canvas-confetti';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);

    const storedTheme = JSON.parse(localStorage.getItem('darkMode'));
    if (storedTheme !== null) setDarkMode(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [todos, darkMode]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    // Confetti when marking complete
    const completedTodo = todos.find(todo => todo.id === id);
    if (completedTodo && !completedTodo.completed) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  const editTodo = (id, newText) => setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));

  const reorderTodos = (startIndex, endIndex) => {
    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    const [removed] = activeTodos.splice(startIndex, 1);
    activeTodos.splice(endIndex, 0, removed);

    setTodos([...activeTodos, ...completedTodos]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>React To-Do App</h1>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={sortedTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        reorderTodos={reorderTodos}
      />
    </div>
  );
};

export default App;
