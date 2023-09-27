import { useState, useEffect } from 'react';
import './App.css';


import Header from './components/Header';

import TodoItem from './components/TodoItem';
import Search from './components/Search';

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const[empty,setEmpty] = useState(false)
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

 
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }, [todos]);


  function addTodo() {
    if (value.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        task: value,
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setValue('');
      setEmpty(false);
    } else {
      setEmpty(true); 
  
     
      setTimeout(() => {
        setEmpty(false);
      }, 3000);
    }
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleReset() {

    setTodos([]);
  }


  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return b.createdAt - a.createdAt;
  });

  const filteredTodos = sortedTodos.filter((todo) =>
  todo.task.toLowerCase().includes(searchQuery.toLowerCase())
);



  return (
    <div className="App">
      <div className="todoContainer">
      <Header formattedDate={formattedDate} handleReset={handleReset} />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
        />
      

        <form className="inputContainer">

          <input
            type="text"
            className="todoInput"
            value={value}
            
            placeholder = "Enter your task here" 
            onChange={(e) =>{
              setValue(e.target.value)
              setEmpty(false); 
            } }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
          />
        
          <button onClick={addTodo} className="addTodo">
            +
          </button>
        </form>

        {empty && (
          <p style={{color:"red"}}>** Enter Something ** </p>
          )

           
           }


        {todos.length === 0 ? (
          <p className='emptyTodo'>** No tasks added yet!  **</p>
        ) : (
          // Render the list of tasks
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
