import React, { useState } from 'react';
import './AddTask.css';

function AddTask({ onAddTask, handleToDisplay }) {
  const [inputTitle, setInputTitle] = useState('');
  const [inputD, setInputD] = useState('');

  function handleInput(event, text) {
    if (text === 't') {
      setInputTitle(event.target.value);
    } else {
      setInputD(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputTitle && inputD) {
      onAddTask(inputTitle, inputD);
      setInputTitle('');
      setInputD('');
    }
  }

  return (
    <section className="AddTaskWrapper">
      <form className='form' onSubmit={handleSubmit}>
        <section className='inputs'>
          <section className='Labes'>
            <label>Title</label>
            <label>Description</label>
          </section>
          <section className='input'>
            <input 
              type="text" 
              placeholder='Write your todo title'  
              value={inputTitle} 
              className='inputTitle' 
              onChange={(e) => handleInput(e, 't')}
            />
            <input 
              type="text"
              placeholder='Write your todo description' 
              value={inputD}  
              className='inputDescription'
              onChange={(e) => handleInput(e, 'd')} 
            />
          </section>
        </section>
        <section className='button'>
          <button type='submit' className='submit'>Add</button>
        </section>
      </form>
      <section className='viewTable'>
        <button className='todolist' onClick={() => handleToDisplay('list')}>Todo List</button>
        <button className='completed' onClick={() => handleToDisplay('completed')}>Completed List</button>
      </section>
    </section>
  );
}

export default AddTask;
