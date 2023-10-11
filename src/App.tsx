import {useEffect, useState} from 'react';
import {getTasks} from './api/tasks';

function App() {

  const [tasks, setTasks] = useState([]);

useEffect(() => {
    getTasks(setTasks)
},[])


  console.log(tasks)

  return (
  <div>
    Hello
  </div>
  );
}

export default App;
