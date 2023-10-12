import React, {useEffect, useState} from 'react';
import {FaTrash} from 'react-icons/fa'
import {HiOutlinePlusCircle} from 'react-icons/hi'
import {GiFinishLine} from 'react-icons/gi'
import {deleteTask, updateTask} from "../api/tasks";
import {getOperations} from "../api/operations";
import Operations from "./Operations";

type Task = {
    title: string,
    description: string,
    id: number,
    status: 'open' | 'closed'
}


const Task = ({task, handleDeleteTask}: { task: Task, handleDeleteTask: (id: number) => void }) => {

    const {title, description, id,  status: _status} = task

    const [status, setStatus] = useState(_status);
    const [operations, setOperations] = useState([]);
    const [operationForm, setOperationForm] = useState(false);

    const handleFinishTask = () => {

        const task = {
            title,
            description,
            status: 'closed'
        }

        updateTask(id, task, () => {
            setStatus('closed')
        })
    }


    const handleRemoveTask = () => {
        deleteTask(id, () => {
            handleDeleteTask(id)
        })
    }

    const toggleOperationForm = () => {
        setOperationForm(!operationForm)
    }

    useEffect(() => {
        getOperations(id, setOperations)
    }, []);


    return (
        <section
            className='container mx-auto w-full h-full border border-gray-200 mt-[15px] bg-gray-100 shadow rounded p-2'>
            <div className='flex flex-row gap-4 justify-between items-center'>
                <div>

                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <h5 className='text-gray-400'>{description}</h5>
                </div>
                <div className='flex flex-row gap-4'>
                    {status === 'open' && (
                        <>
                            <button
                                onClick={toggleOperationForm}
                                className='bg-emerald-600 hover:bg-blue-700 text-white font-bold py-2 px-4
                        rounded mt-[10px] duration-500 text-[10px] flex items-center gap-2'>
                                Add opertaion:
                                <HiOutlinePlusCircle className='text-[15px]'/>
                            </button>
                            <button
                                onClick={handleFinishTask}
                                className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                    rounded focus:outline-none focus:shadow-outline mt-[10px] duration-500 text-[10px] flex items-center gap-2'>
                                Finish:
                                <GiFinishLine className='text-[15px]'/>
                            </button>
                        </>
                    )}
                    {
                        operations.length === 0 && (
                            <button
                                onClick={handleRemoveTask}
                                className='bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4
                    rounded focus:outline-none focus:shadow-outline mt-[10px] duration-500'>
                                <FaTrash/>
                            </button>
                        )
                    }

                </div>
            </div>
            <Operations taskID={id}
                        form={operationForm}
                        setForm={setOperationForm}
                        operations={operations}
                        setOperations={setOperations}
                        status={status}/>
        </section>
    );
};

export default Task;