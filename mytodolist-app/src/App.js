
import AddTask from './components/AddTask';
import './App.css';
import DisplayTasks from './components/DisplayTasks';

function App() {
  return (
    <>
    <main >
      <h1>Welcome Back</h1>
     <section className='upper_part'>
        <AddTask/>
     </section>
     <section className='lower_part'>
        <DisplayTasks/>
     </section>
    </main>
    </>
    
  );
}

export default App;
