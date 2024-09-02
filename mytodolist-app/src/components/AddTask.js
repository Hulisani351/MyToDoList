
import './AddTask.css';
import { useState } from 'react';

function AddTask() {
  const  [input,setInput]=useState('');
  return (
    <section className="AddTaskWrapper">
        <form  className='form'>
            <section className='inputs'>
              <label>Title</label>
              <input type="text" placeholder='Write your todo title'  value={input} className='inputTitle' />
            </section>
            <section className='inputs'>
              <label>Description</label>
              <input type="text" placeholder='Write your todo description' value={input}  className='inputDescription' />
            </section>
            <section className='button'>
              <button className='submit'>Add</button>
            </section>
           
        </form>
        <section className='viewTable'>
            <button>Todo List </button>
            <button>Completed List</button>
        </section>
    </section>
  );
}

export default AddTask;
