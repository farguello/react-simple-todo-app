import { useState, useRef, useEffect, useCallback } from 'react'
import TodoElement, { Todo } from './TodoElement';

function App() {
  const counter = useRef(0);
  const [todos, setTodos] = useState<Todo[]>([{id: counter.current, text: 'Learn React', completed: false}]);
  const [name, setName] = useState('');
  
   function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTodo = {id: ++counter.current, text: name, completed: false};
    console.log(newTodo);
    
    setTodos([...todos, newTodo]);
    setName('');
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  const toggleCompleted = useCallback((id: number) => {
    const newTodos = todos.map(todo => {
      const mappedTodo = {...todo};
      if (mappedTodo.id === id) {
        mappedTodo.completed = !mappedTodo.completed;
      }
      return mappedTodo;
    })
    setTodos(newTodos);
  }, [todos]);

  const deleteTodo = useCallback((id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }, [todos]);

  const editTodo = useCallback((id: number) => {
    // TODO: implement edit.
    
  }, []);

  return (
    <>
    <div className='mt-5 flex justify-center '>
      <div className=' p-3 flex-col border-2 rounded-lg border-blue-600 bg-blue-500 text-white text-xl'>
        <h1 className='flex-row'>React Todo App</h1>
        <form className='mt-3 flex-row' onSubmit={handleFormSubmit}>
          <label className='block my-2' htmlFor='name'>Task: </label>
          <input
            className='block my-2 border-2 text-black'
            id='name'
            value={name}
            placeholder='Enter task name'
            onChange={handleNameChange}
            />
          <button 
            className='block float-right my-2 py-2 px-5 border-2 rounded-xl hover:bg-white hover:text-blue-500'
            type='submit'
          >
              Add
          </button>
        </form>
      </div>
    </div>
    <ul className='m-3 p-3'>
    {todos.map((todo) =>
      <TodoElement
        key={todo.id}
        todo={todo} 
        actions={{toggleCompleted, deleteTodo, editTodo}} />)}
  </ul>
  </>
  )
}

export default App
