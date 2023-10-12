import React from 'react';

type OperationsProps = {
    taskID: number,
    form: boolean,
    setForm: React.Dispatch<React.SetStateAction<boolean>>,
    operations: any[],
    setOperations:  React.Dispatch<React.SetStateAction<never[]>>
    status: string
}
const Operations = ({taskID, form, setForm, operations, setOperations, status}: OperationsProps) => {
    return (
        <div>
            operations
        </div>
    );
};

export default Operations;