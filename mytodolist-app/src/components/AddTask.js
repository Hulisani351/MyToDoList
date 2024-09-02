
import './AddTask.css';
import { useState } from 'react';

function AddTask() {
  const [inputTitle,setInputTitle]=useState('');
  const [inputD,setInputD]=useState('');
  const [tasksTitle,setTasksTitle]=useState(['BreakFast','Lunch'])
  const [tasksD,setTasksD]=useState(['at 8 i will have my breakfast','at 10 i will have my lunch'])

  function handleInput(event,text){
    if(text==='t'){
      setInputTitle(event.target.value);
    }else{
      setInputD(event.target.value);
    }
    
  }
  function AddTask(){

  }
  function removeTask(){

  }
  function moveTaskUp(){

  }
  function moveTaskDown(){

  }
  function completeTask(){

  }
  return (
    <section className="AddTaskWrapper">
        <form  className='form'>
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
