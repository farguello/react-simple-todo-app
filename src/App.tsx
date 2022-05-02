import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import TodoElement, { Todo } from './components/TodoElement';
import TodoForm from './components/TodoForm';

function App() {
  const counter = useRef(1);
  const [todos, setTodos] = useState<Todo[]>([
    { id: counter.current, text: 'Learn React', completed: false },
  ]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name) return;

    let todo;
    const otherTodos = todos.filter((todo) => todo.id !== editingId);
    if (editingId) {
      todo = { ...todos.filter((todo) => todo.id === editingId)[0] };
      if (todo) {
        todo.text = name;
      }
    } else {
      todo = { id: ++counter.current, text: name, completed: false };
    }

    setTodos([...otherTodos, todo]);
    setName('');
    setEditingId(null);
  }

  function handleFormReset() {
    setName('');
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  const toggleCompleted = useCallback(
    (id: number) => {
      const newTodos = todos.map((todo) => {
        const mappedTodo = { ...todo };
        if (mappedTodo.id === id) {
          mappedTodo.completed = !mappedTodo.completed;
        }
        return mappedTodo;
      });
      setTodos(newTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    },
    [todos]
  );

  const editTodo = useCallback(
    (id: number) => {
      const todoToEdit = todos.find((todo) => todo.id === id);

      if (todoToEdit) {
        setName(todoToEdit.text);
        setEditingId(id);
      }
    },
    [todos]
  );

  const todoActions = useMemo(() => {
    return { toggleCompleted, deleteTodo, editTodo };
  }, [toggleCompleted, deleteTodo, editTodo]);

  return (
    <>
      <div className="mt-5 flex justify-center">
        <div className=" p-3 flex-col border-2 rounded-lg border-blue-600 bg-blue-500 text-white text-xl">
          <h1 className="flex-row">React Todo App</h1>
          <TodoForm
            name={name}
            handleFormReset={handleFormReset}
            handleFormSubmit={handleFormSubmit}
            handleNameChange={handleNameChange}
            id={editingId}
          />
        </div>
      </div>
      <ul className="m-3 p-3">
        {todos.map((todo) => (
          <TodoElement key={todo.id} todo={todo} actions={todoActions} />
        ))}
      </ul>
    </>
  );
}

export default App;
