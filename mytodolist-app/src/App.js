import React, { useState } from 'react';
import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedDescriptions, setCompletedDescriptions] = useState([]);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [display, setDisplay] = useState('list');

  const handleAddTask = (title, description) => {
    setTasks(prevTasks => [...prevTasks, title]);
    setDescriptions(prevDescriptions => [...prevDescriptions, description]);
  };

  const handleDeleteTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    setDescriptions(prevDescriptions => prevDescriptions.filter((_, i) => i !== index));
  };

  const handleCompleteTask = (index) => {
    const now = new Date().toLocaleString(); // Get current time
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, tasks[index]]);
    setCompletedDescriptions(prevCompletedDescriptions => [...prevCompletedDescriptions, descriptions[index]]);
    setCompletionTimes(prevCompletionTimes => [...prevCompletionTimes, now]);
    handleDeleteTask(index);
  };

  const handleDisplayChange = (view) => {
    setDisplay(view);
  };
  const moveUp = (index) => {
    if (index > 0) {
      // Swap elements in tasks
      const newTasks = [...tasks];
      const tempTask = newTasks[index];
      newTasks[index] = newTasks[index - 1];
      newTasks[index - 1] = tempTask;
      
      // Update tasks state
      setTasks(newTasks);
  
      // Swap elements in descriptions
      setDescriptions(prevDescriptions => {
        const newDescriptions = [...prevDescriptions];
        const tempDescription = newDescriptions[index];
        newDescriptions[index] = newDescriptions[index - 1];
        newDescriptions[index - 1] = tempDescription;
        return newDescriptions;
      });
    }
  };
  
  const moveDown = (index) => {
    if (index < tasks.length - 1) {
      // Swap elements
      const newTasks = [...tasks];
      const tempTask = newTasks[index];
      const tempDescription = descriptions[index];
      
      newTasks[index] = newTasks[index + 1];
      newTasks[index + 1]=tempTask;
      setTasks(newTasks);
      
      setDescriptions(prevDescriptions => {
        const newDescriptions = [...prevDescriptions];
        newDescriptions[index] = newDescriptions[index + 1];
        newDescriptions[index + 1] = tempDescription;
        return newDescriptions;
      });
    }
  };
  
  const move = (index, direction) => {
    if (direction === 'up') {
      moveUp(index);
    } else if (direction === 'down') {
      moveDown(index);
    }
  };
  

  return (
    <>
      <main>
        <h1>Welcome Back</h1>
        <p className='Name'>Nkosinathi</p>
        <section className='upper_part'>
          <AddTask onAddTask={handleAddTask} handleToDisplay={handleDisplayChange} />
        </section>
        <section className='lower_part'>
          <DisplayTasks
            tasks={tasks}
            descriptions={descriptions}
            completedTasks={completedTasks}
            completedDescriptions={completedDescriptions}
            completionTimes={completionTimes}  // Pass completionTimes as a prop
            deleteIndex={handleDeleteTask}
            completedIndex={handleCompleteTask}
            whatToDisplay={display}
            handleMove={move}
          />
        </section>
      </main>
    </>
  );
}

export default App;
