import {useEffect, useState} from 'react';
import {getTasks} from './api/tasks';
import NewTask from './components/NewTask';
import Task from './components/Task';

type Task = {
    id: number,
    task: string
}

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
    getTasks(setTasks)
},[])

  const handleNewTask = (task: string) => {
      // @ts-ignore
      setTasks( [...tasks, task])
  }

  const handleDeleteTask = (id: number) => {
      setTasks(tasks.filter(task => task.id !== id))
  }

    return (
  <div className='flex flex-col'>
      <NewTask handleNewTask={handleNewTask}/>
      {tasks.map(task => (
          <Task key={task.id} task={task} handleDeleteTask={handleDeleteTask}/>
      ))}
  </div>
  );
}

export default App;
