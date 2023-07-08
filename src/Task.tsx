import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    updateTask: (taskID: string, title: string) => void
}

//деструктиразиция пропсом помогает убрать ворнинг в консоли при юзколбеке
export const Task = memo(({task, removeTask, changeTaskStatus, updateTask}: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
        changeTaskStatus(task.id, newStatus)
    }
    const onTitleChangeHandler = (newValue: string) => {
        updateTask(task.id, newValue)
    }

    return (
        <li className={task.isDone ? "is-done" : ""}>
            <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
            <EditableSpan title={task.title} callback={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon/>
            </IconButton>
        </li>
    );
})

