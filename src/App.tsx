import {useEffect, useState} from 'react';
import {getTasks} from './api/tasks';
import NewTask from './components/NewTask';

function App() {

  const [tasks, setTasks] = useState([]);

useEffect(() => {
    getTasks(setTasks)
},[])

  const handleNewTask = (task: string) => {
      // @ts-ignore
      setTasks( [...tasks, task])
  }

  const handleDeleteTask = (id: number) => {
      // @ts-ignore
      setTasks(tasks.filter(task => task.id !== id))
  }

    return (
  <div>
      <NewTask handleNewTask={handleNewTask}/>
  </div>
  );
}

export default App;
