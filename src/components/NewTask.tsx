import React, {useState} from 'react';
import {createTask} from '../api/tasks';



const NewTask = ({handleNewTask}: { handleNewTask: (task: string) => void }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')



    const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const task = {
            title,
            description,
            status: 'open'
        }


        createTask(task, handleNewTask)
        console.log(task)

        setTitle('')
        setDescription('')

    }
    console.log(title, description)

    return (
        <section className='container mx-auto w-full h-full border border-gray-200 mt-[15px] shadow rounded p-6'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-4xl font-bold'>New task:</h1>
                <form onSubmit={handleAddTask}>
                    <div className='flex flex-col gap-2 w-full border mb-2'>
                        <input
                            className='w-full p-2'
                            onChange={(e) => setTitle(e.target.value)}
                            type='text'
                            placeholder='Task'
                            value={title}/>
                    </div>
                    <div className='flex flex-col gap-2 w-full border'>
                        <input
                            className='w-full p-2'
                            onChange={(e) => setDescription(e.target.value)}
                            type='text'
                            placeholder='Description'
                            value={description}/>
                    </div>
                    <button
                        className='bg-green-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-[10px]'
                        type='submit'>Add task:</button>
                </form>
            </div>
        </section>
    );
};

export default NewTask;