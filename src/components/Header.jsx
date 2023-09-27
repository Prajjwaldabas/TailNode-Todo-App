

  import React from 'react'
  
  const Header =({ formattedDate, handleReset })=> {
    return (
        <div className='todo-date'>
        <p className='date'>{formattedDate}</p>
        <button onClick={handleReset} className='reset_Btn'>
          Clear
        </button>
      </div>
    )
  }
  
  export default Header