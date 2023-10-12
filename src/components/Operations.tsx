import React, {useState} from 'react';
import {createOperation} from "../api/operations";
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

    // @ts-ignore
    return (
        <>
            {form && (
                <div>
                    <form>
                        <div>
                            <input
                                type='text'
                                placeholder='Operation description'
                                value={operationDescription}
                                onChange={(e) => setOperationDescription(e.target.value)}/>
                            <div>
                                <button onClick={handleNewOperation}>Add operation</button>
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