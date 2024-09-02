
import './AddTask.css';
import { useState } from 'react';

function AddTask() {
  const  [input,setInput]=useState('');
  return (
    <section className="AddTaskWrapper">
        <form  className='form'>
            <section className='inputs'>
              <section className='Labes'>
                <label>Title</label>
                <label>Description</label>
              </section>
              <section className='input'>
                <input type="text" placeholder='Write your todo title'  value={input} className='inputTitle' />
                <input type="text" placeholder='Write your todo description' value={input}  className='inputDescription' />
              </section>
            </section>
            <section className='button'>
              <button className='submit'>Add</button>
            </section>
           
        </form>
        <section className='viewTable'>
            <button className='todolist'>Todo List </button>
            <button className='completed'>Completed List</button>
        </section>
    </section>
  );
}

export default AddTask;
