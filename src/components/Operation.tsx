import React, {useState} from 'react';
import {deleteOperation, updateOperation} from "../api/operations";
import {FaSave, FaTrashAlt} from 'react-icons/fa'


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
            return
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
        <li>
            <div>
                {description}
                {timeSpent > 0 && (
                    <span>
                        {hours}h {minutes}m
                    </span>
                )}
            </div>

            {timeSpentForm && (
                <form onSubmit={handleTimeSave}>
                    <div>
                        <input type='number'
                               value={timeSpentInput}
                               placeholder='Spent Time in minutes'
                               onChange={(e) => setTimeSpentInput(e.target.value)}
                        />
                        <div>
                            <button onClick={(e) => setTimeSpentForm(false)}>
                                <FaSave/>
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {!timeSpentForm && (
                <div>
                    {status === 'open' && (
                        <button onClick={(e) => setTimeSpentForm(true)}>
                            Add time
                            <FaTrashAlt/>
                        </button>
                    )}
                </div>
            )}
        </li>
    );
};

export default Operation;