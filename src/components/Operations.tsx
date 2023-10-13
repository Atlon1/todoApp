import React, {useState} from 'react';
import {createOperation} from "../api/operations";
import {HiOutlinePlusCircle} from 'react-icons/hi'
import Operation from "./Operation";

type OperationsProps = {
    taskID: number,
    form: boolean,
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    operations: any[],
    setOperations: React.Dispatch<React.SetStateAction<never[]>>
    status: string
}
const Operations = ({taskID, form, setForm, operations, setOperations, status}: OperationsProps) => {

    const [operationDescription, setOperationDescription] = useState("");
    const handleNewOperation = () => {

        const operation = {
            description: operationDescription,
            timeSpent: 0,
        }

        createOperation(taskID, operation, (data: any) => {
            // @ts-ignore
            setOperations([...operations, data])
            setOperationDescription("")
            setForm(false)
        })
    }

    const handleRemoveOperation = (id: number) => {
        // @ts-ignore
        setOperations(operations.filter(operation => operation.id !== id))
    }

    return (
        <>
            {form && (
                <div className='flex flex-col py-2 w-full h-full'>
                    <form className='flex flex-col'>
                        <div className='flex gap-3'>
                            <input
                                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4
                                text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                                type='text'
                                placeholder='Operation description'
                                value={operationDescription}
                                onChange={(e) => setOperationDescription(e.target.value)}/>
                            <div className='flex'>
                                <button
                                    className='bg-emerald-600 hover:bg-blue-700 text-white font-bold py-2 px-4
                                    rounded text-[10px] duration-500 flex items-center gap-2'
                                    onClick={handleNewOperation}>
                                    <HiOutlinePlusCircle className='text-[15px]'/>
                                    Add operation
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <ul>
                {operations.map((operation) => (
                    <div>
                        <Operation key={operation.id} {...operation} onRemoveOperation={handleRemoveOperation} status={status}/>
                    </div>
                ))}
            </ul>
        </>
    );
};

export default Operations;