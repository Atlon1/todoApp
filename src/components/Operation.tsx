import React, {useState} from 'react';
import {deleteOperation, updateOperation} from "../api/operations";
import {FaSave, FaTrashAlt, FaTimes, FaClock} from 'react-icons/fa'


type OperationProps = {
    description: string,
    id: number,
    onRemoveOperation: (id: number) => void,
    timeSpent: number,
    status: string
}
const Operation = ({description, id, onRemoveOperation, timeSpent: _timeSpent, status}: OperationProps) => {

    const [timeSpentForm, setTimeSpentForm] = useState(false);
    const [timeSpent, setTimeSpent] = useState(_timeSpent);
    const [timeSpentInput, setTimeSpentInput] = useState("");


    const handleTimeSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // @ts-ignore
        if (isNaN(parseInt(timeSpentInput) || timeSpentInput < 0)) {
            return;
        }


        const operation = {
            description,
            // @ts-ignore
            timeSpent: parseInt(timeSpent) + parseInt(timeSpentInput)
        }
        updateOperation(id, operation, (data: any) => {
            setTimeSpent(data.timeSpent)
            setTimeSpentForm(false)
        })
    }

    const handleRemoveOperation = () => {
        deleteOperation(id, () => {
            onRemoveOperation(id)
        })
    }

    const hours = Math.floor(timeSpent / 60)
    const minutes = timeSpent % 60


    return (
        <li className='flex flex-row justify-between items-center py-4 px-4 border border-gray-600 m-2'>
            <div className='flex flex-row gap-2 justify-center items-center'>
                {description}
                {timeSpent > 0 && (
                    <span className='text-[13px] text-white bg-emerald-600 rounded p-[2px]'>
                        {hours}h {minutes}m
                    </span>
                )}
            </div>

            {timeSpentForm && (
                <form
                    onSubmit={handleTimeSave}>
                    <div className='flex flex-row justify-center items-center'>
                        <input
                            className='border border-gray-600 p-[2px] '
                            type='number'
                               value={timeSpentInput}
                               placeholder='Spent Time in minutes'
                               onChange={(e) => setTimeSpentInput(e.target.value)}
                        />
                        <div className=''>
                           <button
                               className='p-[6px] border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white duration-500'
                               type='submit'><FaSave/></button>
                            <button
                                className='p-[6px] border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-500'
                                onClick={(e) => setTimeSpentForm(false)}>
                                <FaTimes/>
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {!timeSpentForm && (
                <div className='flex flex-row gap-2 items-center justify-center'>
                    {status === 'open' && (
                        <button className='bg-white text-emerald-600 border border-emerald-600 p-2 flex justify-center
                        items-center gap-x-2 rounded hover:bg-emerald-600 hover:text-white duration-500' onClick={() => setTimeSpentForm(true)}>
                            Add Time
                            <FaClock/>
                        </button>
                    )}
                    <button
                        className='bg-white text-red-600 border border-red-600 p-3 flex justify-center items-center gap-x-2 rounded hover:bg-red-600 hover:text-white duration-500'
                        onClick={handleRemoveOperation}><FaTrashAlt/></button>
                </div>
            )}
        </li>
    );
};

export default Operation;