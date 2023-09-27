import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
const TodoItem = ({ todo, toggleComplete, deleteTodo })  => {
  return (
    <div key={todo.id} className='itemContainer'>
    <input
      type='checkbox'
      className='checkbox'
      checked={todo.completed}
      onChange={() => toggleComplete(todo.id)}
    />
    <li className={`todoItem ${todo.completed ? 'completed' : ''}`} onClick={() => toggleComplete(todo.id)}>
      {todo.task}
    </li>
    {todo.completed && (
      <DeleteIcon
        onClick={() => deleteTodo(todo.id)}
        style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
      ></DeleteIcon>
    )}
  </div>
  )
}

export default TodoItem