import './DisplayTask.css';
import { useState } from 'react';


function DisplayTasks(){
    return(
        <>
        <h2>To do tasks</h2>
        <ul>
            {tasks.map((task,i)=>{
                <li key={i}>
                    <section>
                        <h3 className='title'>{task}</h3>
                        <p className='title'>{discription}</p>
                    </section>
                </li>
            })}
        </ul>
        </>
    )

}

export default DisplayTasks