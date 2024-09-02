import React from 'react';
import './DisplayTask.css';

function DisplayTasks({
  tasks,
  descriptions,
  completedTasks,
  completedDescriptions,
  completionTimes = [],
  deleteIndex,
  completedIndex,
  whatToDisplay,
  handleMove
}) 
{
  const renderTasks = (tasksList, descriptionsList, timesList, isCompleted) => (
    <ul>
      {tasksList.map((task, i) => (
        <li key={i}>
          <section className='tasks'>
            <span className='title'><h3>{task}</h3></span>
            <span className='description'><p>{descriptionsList[i]}</p></span>
          </section>
          {isCompleted && (
            <span className='completed-time'>
              <p>Completed at: {timesList[i]}</p>
            </span>
          )}
          {!isCompleted && (
            <section className='functionalties'>
              <button 
                className='btn1' 
                onClick={() => handleMove(i, 'up')} 
                disabled={i === 0}  // Disable the button if it's already at the top
              >
                Move Up
              </button>
              <button 
                className='btn2' 
                onClick={() => handleMove(i, 'down')} 
                disabled={i === tasksList.length - 1}  // Disable the button if it's already at the bottom
              >
                Move Down
              </button>
              <button className='btn3' onClick={() => completedIndex(i)}>Complete</button>
              <button className='btn4' onClick={() => deleteIndex(i)}>Delete</button>
            </section>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <section className='header'> 
        <h2>{whatToDisplay === 'list' ? 'To Do Tasks' : 'Completed Tasks'}</h2>
      </section>
      <section className='display'>
        {whatToDisplay === 'list' ? 
          renderTasks(tasks, descriptions, [], false) :
          renderTasks(completedTasks, completedDescriptions, completionTimes, true)
        }
      </section>
    </>
  );
}

export default DisplayTasks;
